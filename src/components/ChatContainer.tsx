import { Button, Icon, IconButton } from "@mui/material"
import { EmojiEmotions, Send, Image  } from '@mui/icons-material'
import Picker from '@emoji-mart/react'
import { Message } from "./Message"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import type{ SendMessageType } from "@/types/Provider"
import type { DeleteMessageType, EditMessageType, MessagesType } from "@/types/Messages"

type ChatContainerProps = {
  id: string
}



export const ChatContainer = ({id} : ChatContainerProps ) => {
  const [messageValue, setMessageValue] = useState<string>('');
  const [messageId, setMessageId] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { user, getAllMessages, messages, sendMessage, updateMessage, deleteMessage} = useAuth();
  useEffect(() => {
    getAllMessages(id)
  },[])

  const handleWriteMessage = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const inputValue = (e.target as HTMLInputElement).value;
    setMessageValue(inputValue)
  }

  const handleSendMessage = () => {
    if(!!messageValue){
      if(isEdit){
        const data : EditMessageType = {
          id: '4qnTIdHA9zRcIGkMub6R',
          idMessage: messageId,
          message: messageValue
        }
        updateMessage(data)
        setIsEdit(false)
        setMessageValue('')
      }
      else{
        const data : SendMessageType = {
          user: user?.displayName,
          userEmail: user?.email,
          userImage: user?.photoURL,
          id: '4qnTIdHA9zRcIGkMub6R',
          message: messageValue
        }
        sendMessage(data)
        setMessageValue('')
      }
    }
  }

  const handleSelectEdit = (id:string,text: string) => {
    setMessageValue(text)
    setMessageId(id)
    setIsEdit(true)
  }

  const handleDelete = (id: string) => {
    const data: DeleteMessageType = {
      id: '4qnTIdHA9zRcIGkMub6R',
      idMessage: id
    }
    deleteMessage(data)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSendMessage();
  }

  return(
    <>
      <div className="w-full h-full bg-cyan-950 bg-opacity-70 rounded-r-xl">
        <div className="w-full h-5/100 bg-cyan-600 bg-opacity-60 rounded-tr-xl flex items-center px-4">
          <p>
            Chat test
          </p>
        </div>
        <div className="w-full h-17/20 p-2 overflow-y-scroll">
          <div className="flex flex-col gap-2">
            {
              messages?.map((message: MessagesType, i: string) => 
                <Message 
                  key={i} 
                  data={message} 
                  isMine={message.userEmail === user?.email} 
                  editMessage={handleSelectEdit}
                  deleteMessage={handleDelete}
                />
              )
            }
          </div>
        </div>
        <div className="w-full bg-cyan-950 bg-opacity-90 h-1/10 rounded-br-xl flex p-4 items-center">
          <form onSubmit={handleSubmit} className="w-9/10 w-p:w-4/5 flex h-8">
            <input 
              type="text" 
              onChange={handleWriteMessage} 
              value={messageValue} 
              className="bg-cyan-600 bg-opacity-60 border-none rounded px-1 w-full focus:outline"
            />
          </form>
          <div className="w-1/10 grid grid-cols-2 items-center px-2 gap-2 w-p:w-1/5">
            <Icon 
              component={EmojiEmotions} 
              fontSize={"medium"} 
              className=" hover:text-cyan-400 cursor-pointer"
            />
           { /*<IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file"/>
              <Image fontSize={"medium"} className=" hover:text-cyan-400 cursor-pointer text-white"/>            
          </IconButton>   */ }       
            <Icon 
              component={Send} 
              fontSize={"medium"} 
              className=" hover:text-cyan-400 cursor-pointer" 
              onClick={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </>
  )
}