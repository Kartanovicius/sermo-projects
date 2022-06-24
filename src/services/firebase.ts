import { addDoc, arrayUnion, collection, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../lib/firebase'


export async function getUserByUserId(uid: string) {
    const userRef = collection(db, 'users')

    const q = query(userRef, where('uid', '==', uid))

    try {
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs[0].data()
    } catch(e) {
      console.log(e)
    }
}

export async function updateFieldByUserId(uid: string, newValue: {first?: string, last?: string, emailAddress?: 'string'}) {
  const userRef = collection(db, 'users')

  const q = query(userRef, where('uid', '==', uid))

  try {
    const querySnapshot = await getDocs(q)
    updateDoc(querySnapshot.docs[0].ref, newValue)
    return {
      status: 'fulfilled',
      value: newValue
    }
  } catch(e) {
    return {
      status: 'rejected',
      error: e,
    }
  }
}

export async function createProject(user_uid: string, code: number, client: string, name: string) {
  try {
    const projectRef = collection(db, 'projects')
    const qProject = query(projectRef, where('code', '==', code))
    const projectQuerySnapshot = await getDocs(qProject)

    if (!projectQuerySnapshot.empty) throw new Error("project-code-is-not-unique")

    await addDoc(collection(db, 'projects'), {
      owner: user_uid,
      code: code,
      client: client,
      name: name,
      notes: [],
      dateCreated: Date.now(),
    })

    const userRef = collection(db, 'users')
    const q = query(userRef, where('uid', '==', user_uid))
  
    const querySnapshot = await getDocs(q)
    updateDoc(querySnapshot.docs[0].ref, {projects: arrayUnion({code: code})})
  } catch(e) {
    console.log(e)
  }
}

export async function getUserProjects(uid: string) {
  const projectsRef = collection(db, 'projects')

  const q = query(projectsRef, where('owner', '==', uid))

  try {
    const querySnapshot = await getDocs(q)
    return querySnapshot
  } catch(e) {
    console.log(e)
  }
}