import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../lib/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth'

const AuthContext = createContext<any | null>(null)

export default function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<User | null>()

  function createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function signInUser(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function signOutUser() {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const value = {
    currentUser,
    createUser,
    signInUser,
    signOutUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
