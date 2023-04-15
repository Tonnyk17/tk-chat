import { ProfileMenu } from "@/components/ProfileMenu";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/router";
import { ChatContainer } from "@/components/ChatContainer";
import { RoomsList } from "@/components/RoomsList";
import { useEffect } from "react";

export default function Chat() {
  const router = useRouter();
  const { user, isLoading, rooms } = useAuth();

  useEffect(() => {
    if(rooms?.length > 0){
      const roomFilter = rooms?.find((room: any) => room?.id === String(router?.query?.id))
      if(!roomFilter) router.push('/chat');
    } 
    else {
      router.push('/chat');
    }
  },[])

  return (
    <>
      { isLoading ? 
          <Loader/>
        :
        user ?
          <div className='w-full h-screen flex justify-center items-center'>
            <div className="w-p:w-full w-p:h-full w-t:w-full w-t:h-full w-p:border-0 w-p:rounded-none w-t:border-0 w-t:rounded-none w-9/10 h-9/10 bg-cyan-600 bg-opacity-70 rounded-xl border-2 border-cyan-300 flex shadow-md shadow-cyan-300"> 
              <div className=" w-p:hidden w-t:hidden w-d:flex flex-col w-1/3 bg-cyan-900 bg-opacity-60 h-full rounded-s-xl border-r border-cyan-300">
                <ProfileMenu source={user?.photoURL} name={user?.displayName}/>
                <RoomsList rooms={rooms}/>  
              </div> 
              <div className="w-full h-full flex">
                <ChatContainer id={String(router?.query?.id)}/> 
              </div>    
            </div>
          </div>
        :
          <Loader/>
      }    
    </>
  )
}