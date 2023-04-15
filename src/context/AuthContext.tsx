import { useContext, createContext, useEffect, useState } from "react";
import { auth, db } from "@/firebaseConfig";
import { signInWithRedirect, signOut, onAuthStateChanged, GoogleAuthProvider, getRedirectResult} from 'firebase/auth';
import { useRouter } from "next/router";
import { DocumentData, addDoc, collection, onSnapshot, orderBy, query, updateDoc, deleteDoc, doc } from "firebase/firestore";
import type { AuthProviderType, ContextType, SendMessageType } from "@/types/Provider";
import type { DeleteMessageType, EditMessageType } from "@/types/Messages";
import type { User } from "firebase/auth";

const defaultValues: ContextType = {
  signInGoogle: () => null,
  signOutGoogle: () => null,
  updateMessage: () => null,
  deleteMessage: () => null,
  sendMessage: () => null,
  rooms: null,
  getAllMessages: () => null,
  getRoom: () => null,
  room: null,
  user: null,
  isLoading: true,
  messages: null,
  isClosedModal : true,
  closeModal : () => null,
  createRoom : () => null
}

const AuthContext = createContext<ContextType>(defaultValues)

export const AuthContextProvider = ({ children }: AuthProviderType) => {
  const [user, setUser] = useState<User | null>(null);
  const [rooms, setRooms] = useState<DocumentData | null>();
  const [room, setRoom] = useState<DocumentData | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<DocumentData | null>();
  const [isClosedModal, setIsClosedModal] = useState<boolean>(true);
  const router = useRouter();

  const closeModal = () => {
    setIsClosedModal(!isClosedModal);
  }
  
  const signInGoogle = async() => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider)
  }

  const sessionRedirect = (userData : User | null) => {
    if(!userData){
      router.push('/')
    }
    else {
      if(router.pathname === '/') router.push('/chat')
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

  const getAllMessages = async (id: string) => {
    const queryMessages = query(collection(db,`rooms/${id}/messages`), orderBy("createdAt"));
    await onSnapshot(queryMessages, (querySnapshot) => {
      const docs: any[] = []
      querySnapshot.forEach((doc) => 
        docs.push({...doc.data(), id: doc.id})
      );
      setMessages(docs)
    });
  }

  const getRooms = async(user: string | null | undefined) => {
    const queryMessages = query(collection(db,`rooms`));
    await onSnapshot(queryMessages, (querySnapshot) => {
      const docs: any[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        if(data.users.includes(user)) {
          docs.push({...data, id: doc.id})}
        }
      );
      setRooms(docs)
    });
  }

  const getRoom = (id: string) => {
    const chat = rooms?.find((room: any) => room.id === id)
    setRoom(chat)
  }

  useEffect(() => {
    if(user){
      getRooms(user?.email)
    }
  },[user])

  const sendMessage = async ({...props }:SendMessageType) => {
    const { id, message, user, userEmail, userImage } = props;
    const now = new Date();
    const dateTime = now.toISOString();

    await addDoc(collection(db,`rooms/${id}/messages`),{
      message: message,
      createdAt: dateTime,
      user,
      userEmail,
      userImage
    })
  }

  const createRoom = async (name: string, users: string[]) => {
    await addDoc(collection(db, "rooms"),{
      name,
      users
    })
  }

  const updateMessage = async ({...props }:EditMessageType) => {
    const { id, message, idMessage } = props;
    const docRef = doc(db,`rooms/${id}/messages/${idMessage}`)
    const newMessage = {
      message
    }
    await updateDoc(docRef, newMessage)
  }

  const deleteMessage = async ({ id, idMessage }: DeleteMessageType) => {
    const docRef = doc(db,`rooms/${id}/messages/${idMessage}`)
    await deleteDoc(docRef)
  }

  return(
    <AuthContext.Provider 
      value={{ 
        signInGoogle, 
        signOutGoogle, user, 
        isLoading, 
        getAllMessages,
        deleteMessage,
        rooms,
        messages,
        sendMessage,
        updateMessage,
        closeModal,
        isClosedModal,
        getRoom,
        room,
        createRoom
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}
