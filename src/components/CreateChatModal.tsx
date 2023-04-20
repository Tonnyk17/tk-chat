import { useAuth } from "@/context/AuthContext"
import { Close } from "@mui/icons-material"
import { Icon } from "@mui/material"
import { ChangeEvent, FormEvent, useState } from "react";

export const CreateChatModal = () => {
  const { closeModal, isClosedModal, createRoom, user } = useAuth();
  const [chatName, setChatName] = useState<string>();
  const [chatMembers, setChatMembers] = useState<string[]>();
  const [membersString, setMembersString] = useState<string>('');

  const handleWriteName = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const inputValue = (e.target as HTMLInputElement).value;
    setChatName(inputValue)
  }

  const handleWriteMembers = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const inputValue = (e.target as HTMLInputElement).value;
    const listMembers = inputValue.split(",");
    const members = listMembers.map((item) => item.trim());
    setMembersString(inputValue)    
    setChatMembers(members)
  }

  const handleCreateRoom = () => {
    if(chatName && chatMembers){
      createRoom(chatName, [...chatMembers, String(user?.email)]);
      closeModal();
      setChatName('');
      setChatMembers([]);
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const partRegex = /^[\w-\.]+@gmail\.com(?:,[\w-\.]+@gmail\.com){0,19}$/;
    const isValidate = partRegex.test(membersString)
    if(isValidate){
      handleCreateRoom();
    } else {
      alert("Error: Emails or email list are not valid.")
    }
  }

  return(
    <>
     {
        !isClosedModal &&  
        <div className="w-screen h-screen absolute left-0 top-0 bg-gray-800  bg-opacity-80 flex justify-center items-center">
          <div className="w-p:w-9/10 w-p:h-9/10 w-t:w-9/10 w-t:h-3/4 w-d:w-1/2 w-d:h-3/4 bg-cyan-600 bg-opacity-70 rounded-lg border-2 border-cyan-300 flex flex-col items-end shadow-md shadow-cyan-300 p-5 gap-3">
            <Icon 
              component={Close} 
              fontSize={"medium"} 
              className="hover:text-cyan-300 cursor-pointer" 
              onClick={closeModal}
            />
            <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
              <div className="w-9/10 flex flex-col items-start gap-2 w-p:text-sm w-t:text-base text-cyan-300 font-semibold">
                <p>
                  To add members to the chat, follow these steps:
                </p>
                <ol className="list-decimal">
                  <li>
                    Write a name of the chat room
                  </li>
                  <li>
                    Write the email address of each member separated by a comma.
                  </li>
                  <li>
                    Make sure that each email address is a Gmail address. (For example: email@gmail.com,test@gmail.com)
                  </li>               
                </ol>
                <p>
                  Note: Do not include your email in the list, it will be added automatically.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-7">
                <div className="flex flex-col w-p:w-9/10 w-1/2">
                  <label htmlFor="roomName" className="text-cyan-200">Name of chat room:</label>
                  <input 
                    type="text" 
                    placeholder="Room 302" 
                    id="roomName" 
                    required
                    value={chatName}
                    className="w-full h-8 bg-cyan-950 bg-opacity-90 border-none rounded px-1 focus:outline"
                    onChange={handleWriteName}
                  />
                </div>
                <div className="flex flex-col w-p:w-9/10 w-1/2">
                  <label htmlFor="members" className="text-cyan-200">Members:</label>
                  <input 
                    type="text" 
                    required
                    placeholder="email@gmail.com" 
                    id="members" 
                    value={chatMembers}
                    className="w-full h-8 bg-cyan-950 bg-opacity-90 border-none rounded px-1 focus:outline"
                    onChange={handleWriteMembers}
                  />
                </div>
                <button className=' bg-purple-900 p-2 rounded-md hover:opacity-70 flex gap-2'>
                  Create Chat
                </button>
              </form>
            </div>
          </div>
        </div>    
     }
    </>
  )
}