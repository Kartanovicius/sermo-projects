import { collection, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "../lib/firebase"

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

export async function updateUserFirstByUserId(uid: string, newUserName: string) {
  const userRef = collection(db, 'users')

  const q = query(userRef, where('uid', '==', uid))

  try {
    const querySnapshot = await getDocs(q)
    updateDoc(querySnapshot.docs[0].ref, {first: newUserName})
    return {
      status: 'fulfilled',
      value: newUserName
    }
  } catch(e) {
    return {
      status: 'rejected',
      error: e,
    }
  }
}

export async function updateUserLastByUserId(uid: string, newUserLastName: string) {
  const userRef = collection(db, 'users')

  const q = query(userRef, where('uid', '==', uid))

  try {
    const querySnapshot = await getDocs(q)
    updateDoc(querySnapshot.docs[0].ref, {last: newUserLastName})
    return {
      status: 'fulfilled',
      value: newUserLastName
    }
  } catch(e) {
    return {
      status: 'rejected',
      error: e,
    }
  }
}