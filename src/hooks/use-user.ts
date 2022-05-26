import { DocumentData } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { getUserByUserId } from '../services/firebase';

export default function useUser(uid: string) {
  const [activeUser, setActiveUser] = useState<DocumentData | undefined>();

  useEffect(() => {
    async function getUserObjByUserId(uid: string) {
      const user = await getUserByUserId(uid);
      setActiveUser(user);
    }

    if (uid) {
      getUserObjByUserId(uid);
    }
  }, [uid]);

  return { user: activeUser, setActiveUser };
}