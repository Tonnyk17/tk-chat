
export type MessagesType = {
  createdAt: Date,
  id: string,
  user: string,
  userEmail: string,
  userImage: string,
  message: string,
}

export type MessagePropsType = {
  editMessage: (id:string,text:string) => void;
  deleteMessage: (id: string) => void;
  data: MessagesType,
  isMine?: boolean;
}

export type EditMessageType = {
  id: string,
  idMessage: string,
  message: string,
}

export type DeleteMessageType = {
  id: string,
  idMessage: string
}