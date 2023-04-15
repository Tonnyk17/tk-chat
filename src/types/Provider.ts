import type { User } from "firebase/auth";
import type { DocumentData } from "firebase/firestore";
import type { ReactNode, SetStateAction } from "react";
import { DeleteMessageType, EditMessageType } from "./Messages";


export type AuthProviderType = {
  children: ReactNode;
};

export type SendMessageType = {
  id: string;
  user: string | null | undefined,
  userEmail: string | null | undefined,
  userImage: string | null | undefined,
  message: string,
}

export type ContextType = {
  signInGoogle: () => void;
  signOutGoogle: () => void;
  isClosedModal: boolean;
  closeModal: () => void;
  updateMessage: (props: EditMessageType) => void;
  deleteMessage: (props: DeleteMessageType) => void;
  sendMessage: (props: SendMessageType) => void;
  getRooms: (user: string | null | undefined) => void;
  rooms: DocumentData | null | undefined;
  user: User | null;
  isLoading: boolean;
  getAllMessages: (id: string) => void;
  messages: DocumentData | null | undefined;
  getRoom : (id: string) => void;
  room: DocumentData | null | undefined;
  createRoom: (name: string, users: string[]) => void;
}