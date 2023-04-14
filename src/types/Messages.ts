
export type MessagesType = {
  createdAt: Date,
  id: string,
  user: string,
  userEmail: string,
  userImage: string,
  message: string,
}

export type MessagePropsType = {
  data: MessagesType,
  isMine?: boolean;
}