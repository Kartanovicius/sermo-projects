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