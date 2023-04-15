import { Icon } from "@mui/material"
import { EmojiEmotions, Send, Close, ArrowBackIos } from '@mui/icons-material'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { Message } from "./Message"
import { ChangeEvent, FormEvent, useEffect, useState, useRef } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/router"
import type{ SendMessageType } from "@/types/Provider"
import type { DeleteMessageType, EditMessageType, MessagesType } from "@/types/Messages"

type ChatContainerProps = {
  id: string
}

export const ChatContainer = ({id} : ChatContainerProps ) => {
  const [messageValue, setMessageValue] = useState<string>('');
  const [messageId, setMessageId] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEmojiClosed, setIsEmojiClosed] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, 
    getAllMessages, 
    messages, 
    sendMessage, 
    updateMessage, 
    deleteMessage, 
    getRoom, 
    room
  } = useAuth();
  
  useEffect(() => {
    getAllMessages(id);
    getRoom(id);
  },[id])

  const scrollDown = (divRef: React.RefObject<HTMLDivElement>) => {
    if (divRef.current) {
      divRef.current.scrollTo({
        top: divRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  const handleWriteMessage = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const inputValue = (e.target as HTMLInputElement).value;
    setMessageValue(inputValue)
  }

  const handleSendMessage = () => {
    if(!!messageValue){
      if(isEdit){
        const data : EditMessageType = {
          idMessage: messageId,
          message: messageValue,
          id
        }
        updateMessage(data)
        setIsEdit(false)
        setMessageValue('')
      } else{
        const data : SendMessageType = {
          user: user?.displayName,
          userEmail: user?.email,
          userImage: user?.photoURL,
          message: messageValue,
          id
        }
        sendMessage(data)
        setMessageValue('')
        scrollDown(scrollRef)
      }
    }
  }

  const handleSelectEdit = (id:string,text: string) => {
    setMessageValue(text)
    setMessageId(id)
    setIsEdit(true)
  }

  const handleDelete = (messageId: string) => {
    const data: DeleteMessageType = {
      idMessage: messageId,
      id
    }
    deleteMessage(data)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSendMessage();
  }

  const handleAddEmoji = (emoji: string) => {
    if (inputRef.current !== null) {
      const startMessage = inputRef.current.selectionStart ?? 0;
      const endMessage = inputRef.current.selectionEnd ?? 0;
      const newMessage = messageValue.substring(0, startMessage) + emoji + messageValue.substring(endMessage);
      setMessageValue(newMessage);
    }
  }

  return(
    <>
      <div className="w-p:rounded-none w-t:rounded-none w-full h-full bg-cyan-950 bg-opacity-70 rounded-r-xl">
        <div className="w-p:rounded-none w-t:rounded-none w-full h-5/100 bg-cyan-600 bg-opacity-60 rounded-tr-xl flex items-center px-4">
          <Icon component={ArrowBackIos} onClick={() => router.push("/chat")} className=" hover:text-cyan-300 cursor-pointer"/>
          <p>
            {room?.name}
          </p>
        </div>
        <div ref={scrollRef} className="w-full h-17/20 p-2 overflow-y-scroll">
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
        <div className="w-p:rounded-none w-t:rounded-none w-full bg-cyan-950 bg-opacity-90 h-1/10 rounded-br-xl flex p-4 items-center">
          <form onSubmit={handleSubmit} className="w-9/10 w-p:w-4/5 flex h-8">
            <input 
              ref={inputRef}
              type="text" 
              onChange={handleWriteMessage} 
              value={messageValue} 
              className="bg-cyan-600 bg-opacity-60 border-none rounded px-1 w-full focus:outline"
            />
          </form>
          <div className="w-1/10 flex justify-center items-start px-2 gap-2 w-p:w-1/5">
            <div className="w-p:hidden w-t:hidden w-d:flex w-5 h-5 relative">
              {
                !isEmojiClosed &&
                <div className={`absolute right-0 bottom-6`}>
                  <Picker 
                    data={data} 
                    onEmojiSelect={(emojiData: any) => {
                      handleAddEmoji(emojiData.native)
                    }}
                  />
                </div>
              }
              <Icon 
                component={isEmojiClosed ? EmojiEmotions : Close} 
                fontSize={"medium"} 
                className=" hover:text-cyan-400 cursor-pointer"
                onClick={() => setIsEmojiClosed(!isEmojiClosed)}
              />
            </div>
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