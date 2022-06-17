import { User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserByUserId } from '../services/firebase';
import { useAuth } from './authContext';

const CurrentUserContext = createContext<any|null>(null);

export default function UserProvider({children}: any) {
  const [userFirst, setUserFirst] = useState<User | undefined>();
  const [userLast, setUserLast] = useState<User | undefined>();
  const [userEmailAddress, setUserEmailAddress] = useState<User | undefined>();
  const [userLoading, setUserLoading] = useState<boolean>(true);

  const { currentUser } = useAuth()
  const uid = currentUser.uid

  useEffect(() => {
    async function getUserObjByUserId(uid: string) {
      const user = await getUserByUserId(uid);
      setUserFirst(user?.first)
      setUserLast(user?.last)
      setUserEmailAddress(user?.emailAddress)
      setUserLoading(false)
    }

    if (uid) {
      getUserObjByUserId(uid);
    }
  }, [uid]);

  const value = {
    userFirst,
    userLast,
    userEmailAddress,
    userLoading,
  }

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export function useCurrentUser() {
  return useContext(CurrentUserContext)
}