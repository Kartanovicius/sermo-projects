import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function getUserByUserId(uid: string) {
    const userRef = collection(db, 'users')

    const q = query(userRef, where('uid', '==', uid));

    try {
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs[0].data();               
    } catch(e) {
        console.log(e);
    }
}

