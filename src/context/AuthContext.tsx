import { useContext, createContext, ReactNode } from "react";
import { auth } from "@/firebaseConfig";
import { signInWithRedirect, signOut, onAuthStateChanged, GoogleAuthProvider} from 'firebase/auth';

type contextType = {
  signIn: () => void;
}

type AuthProviderType = {
  children: ReactNode;
};

const defaultValues: contextType = {
  signIn: () => null
}

const AuthContext = createContext<contextType>(defaultValues)

export const AuthContextProvider = ({ children }: AuthProviderType) => {
  
  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider)
    console.log("Login")
  }
  return(
    <AuthContext.Provider value={{ signIn }}>
      { children }
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext);
}
