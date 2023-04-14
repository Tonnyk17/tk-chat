import { ProfileMenu } from "@/components/ProfileMenu";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "@/components/Loader";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ChatContainer } from "@/components/ChatContainer";
import { useParams } from 'next/navigation';

export default function Chat() {
  const router = useRouter()
  const params = useParams()
  const [idMessage, setIdMessage] = useState<string>();
  const { user, isLoading } = useAuth();
  useEffect(() => {
    const id = router.query?.id?.toString()
    setIdMessage(id)
  },[router.query])
  console.log(router.query)
  return (
    <>
      { isLoading ? 
          <Loader/>
        :
        <div className='w-full h-screen flex justify-center items-center'>
          <div className=" w-p:w-full w-p:h-full w-5/6 h-4/5 bg-cyan-600 bg-opacity-70 rounded-xl border-2 border-cyan-300 flex shadow-md shadow-cyan-300"> 
            <div className=" w-p:hidden w-d:flex w-1/3 bg-cyan-900 bg-opacity-60 h-full rounded-s-xl border-r border-cyan-300 p-5 flex">
              <ProfileMenu source={user?.photoURL} name={user?.displayName}/>  
            </div> 
            <div className="w-full h-full flex">
              <ChatContainer id={'4qnTIdHA9zRcIGkMub6R'}/> 
            </div>    
          </div>
        </div>
      }    
    </>
  )
}
