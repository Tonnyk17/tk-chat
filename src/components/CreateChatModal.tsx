import { useAuth } from "@/context/AuthContext"
import { Close } from "@mui/icons-material"
import { Icon } from "@mui/material"
import { ChangeEvent, FormEvent, useState } from "react";

export const CreateChatModal = () => {
  const { closeModal, isClosedModal, createRoom } = useAuth();
  const [chatName, setChatName] = useState<string>();
  const [chatParticipants, setChatParticipants] = useState<string[]>();

  const handleWriteName = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const inputValue = (e.target as HTMLInputElement).value;
    setChatName(inputValue)
  }

  const handleWriteParticipants = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const inputValue = (e.target as HTMLInputElement).value;
    const listParticipants = inputValue.split(",");
    const participants = listParticipants.map((item) => item.trim());
    setChatParticipants(participants)
  }

  const handleCreateRoom = () => {
    if(chatName && chatParticipants){
      createRoom(chatName, chatParticipants);
      closeModal();
      setChatName('');
      setChatParticipants([]);
    }
    else{
      alert("xd")
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleCreateRoom();
  }

  return(
    <>
     {
        !isClosedModal &&  
        <div className="w-screen h-screen absolute left-0 top-0 bg-gray-800  bg-opacity-80 flex justify-center items-center">
          <div className="w-p:w-9/10 w-p:h-9/10 w-t:w-9/10 w-t:h-1/2 w-d:w-1/2 w-d:h-1/2 bg-cyan-600 bg-opacity-70 rounded-lg border-2 border-cyan-300 flex flex-col items-end shadow-md shadow-cyan-300 p-5 gap-5">
            <Icon 
              component={Close} 
              fontSize={"medium"} 
              className="hover:text-cyan-300 cursor-pointer" 
              onClick={closeModal}
            />
            <div className="w-full h-full">
              <form onSubmit={handleSubmit} className="w-full h-full flex flex-col justify-center items-center gap-7">
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
                  <label htmlFor="participants" className="text-cyan-200">Participants:</label>
                  <input 
                    type="text" 
                    required
                    placeholder="email@gmail.com" 
                    id="participants" 
                    value={chatParticipants}
                    className="w-full h-8 bg-cyan-950 bg-opacity-90 border-none rounded px-1 focus:outline"
                    onChange={handleWriteParticipants}
                  />
                  <p className="text-xs text-cyan-950 font-bold">
                    Write the email of the participants. For example: email@gmail.com, test@gmail.com.
                  </p>
                </div>
                <button className=' bg-purple-900 p-2 rounded-md hover:opacity-70 flex gap-2' >
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