import { useContext, createContext, ReactNode, useEffect, useState } from "react";
import { auth, db } from "@/firebaseConfig";
import { signInWithRedirect, signOut, onAuthStateChanged, GoogleAuthProvider} from 'firebase/auth';
import { useRouter } from "next/router";
import type { User } from "firebase/auth";
import { DocumentData, addDoc, collection, onSnapshot, orderBy, query, updateDoc, deleteDoc } from "firebase/firestore";
import type { AuthProviderType, ContextType, SendMessageType } from "@/types/Provider";


const defaultValues: ContextType = {
  signInGoogle: () => null,
  signOutGoogle: () => null,
  sendMessage: () => null,
  getAllMessages: () => null,
  user: null,
  isLoading: true,
  messages: null
}

const AuthContext = createContext<ContextType>(defaultValues)

export const AuthContextProvider = ({ children }: AuthProviderType) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<DocumentData | null>()
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

  const getAllMessages = (id: string) => {
    const queryMessages = query(collection(db,`rooms/${id}/messages`), orderBy("createdAt"));
    onSnapshot(queryMessages, (querySnapshot) => {
      const docs: any[] = []
      querySnapshot.forEach((doc) => 
        docs.push({...doc.data(), id: doc.id})
      );
      setMessages(docs)
    });
  }

  const sendMessage = async ({...props }:SendMessageType) => {
    const { id, user, message } = props;
    const now = new Date();
    const dateTime = now.toISOString();

    await addDoc(collection(db,`rooms/${id}/messages`),{
      message: message,
      createdAt: dateTime,
      user
    })
  }

  return(
    <AuthContext.Provider 
      value={{ 
        signInGoogle, 
        signOutGoogle, user, 
        isLoading, 
        getAllMessages, 
        messages,
        sendMessage
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}
