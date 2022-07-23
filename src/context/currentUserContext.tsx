import { createContext, useContext, useEffect, useState } from 'react'
import { getUserByUserId } from '../services/firebase'
import { IUser } from '../types'
import { useAuth } from './authContext'

const CurrentUserContext = createContext<any|null>(null)

export default function UserProvider({children}: any) {
  const [userFirst, setUserFirst] = useState('')
  const [userLast, setUserLast] = useState('')
  const [userEmailAddress, setUserEmailAddress] = useState('')
  const [userLoading, setUserLoading] = useState<boolean>(true)
  const [updated, setUpdated] = useState<boolean>(false)

  const { currentUser } = useAuth()
  const uid = currentUser.uid

  useEffect(() => {
    async function getUserObjByUserId(uid: string) {
      const user = await getUserByUserId(uid)
      setUserFirst(user.name)
      setUserLast(user.surname)
      setUserEmailAddress(user.emailAddress)
      setUserLoading(false)
      setUpdated(false)
    }

    if (uid) {
      getUserObjByUserId(uid)
    }
    if (updated === true) {
      getUserObjByUserId(uid)
    }
  }, [uid, updated])

  const value = {
    userFirst,
    userLast,
    userEmailAddress,
    userLoading,
    updated,
    setUpdated,
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