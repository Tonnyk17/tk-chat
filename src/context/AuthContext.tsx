import { useContext, createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import { signInWithRedirect, signOut, onAuthStateChanged, GoogleAuthProvider} from 'firebase/auth';
import { useRouter } from "next/router";
import type { User } from "firebase/auth";

type contextType = {
  signInGoogle: () => void;
  signOutGoogle: () => void;
  user: User | null;
  isLoading: boolean;
}

type AuthProviderType = {
  children: ReactNode;
};

const defaultValues: contextType = {
  signInGoogle: () => null,
  signOutGoogle: () => null,
  user: null,
  isLoading: true,
}

const AuthContext = createContext<contextType>(defaultValues)

export const AuthContextProvider = ({ children }: AuthProviderType) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  
  const signInGoogle = async() => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider)
  }

  const sessionRedirect = (userData : User | null) => {
    if(!!userData){
      router.push('/chat')
    }
    else{
      router.push('/')
    }
  }
  useEffect(() => {
    onAuthStateChanged(auth,(currentUser) => {
      setUser(currentUser)
      sessionRedirect(currentUser)
      setIsLoading(false); 
    })
  },[])

  const signOutGoogle = async() => {
    await signOut(auth)
  }

  return(
    <AuthContext.Provider value={{ signInGoogle, signOutGoogle, user, isLoading }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}
