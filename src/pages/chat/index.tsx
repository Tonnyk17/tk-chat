import { ProfileMenu } from "@/components/ProfileMenu";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "@/components/Loader";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ChatContainer } from "@/components/ChatContainer";
import { RoomsList } from "@/components/RoomsList";
import { AddChat } from "@/components/AddChat";

export default function Chat() {
  const router = useRouter()
  const { user, isLoading } = useAuth();

  return (
    <>
      { isLoading ? 
          <Loader/>
        :
        <div className='w-full h-screen flex justify-center items-center'>
          <div className="w-p:w-full w-p:h-full w-t:w-full w-t:h-full w-p:border-0 w-p:rounded-none w-t:border-0 w-t:rounded-none w-9/10 h-9/10 bg-cyan-600 bg-opacity-70 rounded-xl border-2 border-cyan-300 flex shadow-md shadow-cyan-300"> 
            <div className="w-p:fixed w-p:w-full w-t:fixed w-t:w-full w-p:bg-opacity-100 w-p:border-0 w-t:bg-opacity-100 w-t:border-0 w-1/3 w-p:rounded-none w-t:rounded-none bg-cyan-900 bg-opacity-60 h-full rounded-s-xl border-r border-cyan-300 flex flex-col">
              <ProfileMenu source={user?.photoURL} name={user?.displayName}/>
              <RoomsList/>  
            </div> 
            <div className="w-full h-full flex">
              <AddChat/> 
            </div>    
          </div>
        </div>
      }    
    </>
  )
}