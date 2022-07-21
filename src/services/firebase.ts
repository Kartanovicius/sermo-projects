import { addDoc, arrayUnion, collection, DocumentData, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { IProject, IUser } from '../types'


export async function getUserByUserId(uid: string) {
  const userRef = collection(db, 'users')

  const q = query(userRef, where('uid', '==', uid))
  
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs[0].data() as IUser
}

export async function updateFieldByUserId(uid: string, newValue: {name?: string, surname?: string, emailAddress?: 'string'}) {
  const userRef = collection(db, 'users')

  const q = query(userRef, where('uid', '==', uid))

  const querySnapshot = await getDocs(q)
  updateDoc(querySnapshot.docs[0].ref, newValue)
}

export async function createProject(project: IProject) {
  const projectRef = collection(db, 'projects')
  const qProject = query(projectRef, where('code', '==', project.code))
  const projectQuerySnapshot = await getDocs(qProject)

  if (!projectQuerySnapshot.empty) throw new Error("project-code-is-not-unique")

  await addDoc(collection(db, 'projects'), project)
  
  const userRef = collection(db, 'users')
  const q = query(userRef, where('uid', '==', project.owner))

  const querySnapshot = await getDocs(q)
  updateDoc(querySnapshot.docs[0].ref, {projects: arrayUnion({code: project.code})})
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

export async function getProjectByCode(code: number) {
  const projectRef = collection(db, 'projects')

  const q = query(projectRef, where('code', '==', Number(code)))

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs[0].data() as IProject
}

export async function updateProjectByCode(
  code: number, 
  newValue: {
    note?: IProject['note'], 
    recurringTasks?: IProject['recurringTasks'],
  }
  ) {
  const userRef = collection(db, 'projects')

  const q = query(userRef, where('code', '==', code))

  const querySnapshot = await getDocs(q)
  updateDoc(querySnapshot.docs[0].ref, newValue)
}