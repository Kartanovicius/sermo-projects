import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/firebase'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";

const AuthContext = createContext<any|null>(null);

export default function AuthProvider({children}: any) {
  const [currentUser, setCurrentUser] = useState<User | null>();

  function createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  }  

  const value = {
    currentUser,
    createUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}