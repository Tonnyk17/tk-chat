import { useContext, createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import { signInWithRedirect, signOut, onAuthStateChanged, GoogleAuthProvider} from 'firebase/auth';
import { useRouter } from "next/router";
import type { User } from "firebase/auth";

type contextType = {
  signInGoogle: () => void;
  signOutGoogle: () => void;
  user: User | null
}

type AuthProviderType = {
  children: ReactNode;
};

const defaultValues: contextType = {
  signInGoogle: () => null,
  signOutGoogle: () => null,
  user: null
}

const AuthContext = createContext<contextType>(defaultValues)

export const AuthContextProvider = ({ children }: AuthProviderType) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  
  const signInGoogle = async() => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider)
  }

  useEffect(() => {
    onAuthStateChanged(auth,(user) => setUser(user))
  },[])

  useEffect(() => {
    if(!!user) {
      router.push('/chat')
    }
    else{
      router.push('/');
    }
  },[user])

  const signOutGoogle = async() => {
    await signOut(auth)
  }

  return(
    <AuthContext.Provider value={{ signInGoogle, signOutGoogle, user }}>
      { children }
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext);
}
