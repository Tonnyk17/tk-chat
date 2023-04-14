import type { User } from "firebase/auth";
import type { DocumentData } from "firebase/firestore";
import type { ReactNode } from "react";
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
  updateMessage: (props: EditMessageType) => void;
  deleteMessage: (props: DeleteMessageType) => void;
  sendMessage: (props: SendMessageType) => void;
  user: User | null;
  isLoading: boolean;
  getAllMessages: (id: string) => void;
  messages: DocumentData | null | undefined
}