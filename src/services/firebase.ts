import { addDoc, arrayUnion, collection, DocumentData, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../lib/firebase'


export async function getUserByUserId(uid: string) {
  const userRef = collection(db, 'users')

  const q = query(userRef, where('uid', '==', uid))
  
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs[0].data()
}

export async function updateFieldByUserId(uid: string, newValue: {first?: string, last?: string, emailAddress?: 'string'}) {
  const userRef = collection(db, 'users')

  const q = query(userRef, where('uid', '==', uid))

  const querySnapshot = await getDocs(q)
  updateDoc(querySnapshot.docs[0].ref, newValue)
}

export async function createProject(user_uid: string, code: number, client: string, name: string) {
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
}

export async function getUserProjects(uid: string) {
  const projectsRef = collection(db, 'projects')

  const qWhere = query(projectsRef, where('owner', '==', uid))
  const qByDate = query(qWhere, orderBy('dateCreated', 'desc'))
  
  const querySnapshot = await getDocs(qByDate)
  const allProjects: DocumentData[] = []

  querySnapshot.forEach(project => {
    allProjects.push(project.data())
  })

  return allProjects
}