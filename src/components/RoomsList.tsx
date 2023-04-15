import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/router";
import { useEffect } from "react";

export const RoomsList = () => {
  const router = useRouter();
  const { rooms } = useAuth();
  
  return(
    <>
      <div className="w-full h-full">
       {
        rooms?.map((room: any,i: number) => 
          <div 
            key={i} 
            className="w-full h-20 border-t border-b px-4 border-cyan-600 flex gap-3 items-center hover:bg-cyan-700 cursor-pointer"
            onClick={() => router.push(`/chat/${room?.id}`)}
          >
            <div className=" w-12 h-12 bg-purple-700 rounded-full border border-purple-400 shadow shadow-purple-500 flex justify-center items-center">
              <p className="text-xl text-cyan-300 font-semibold">{room?.name[0]}</p>
            </div>
            <div>
              <p className=" text-lg text-cyan-300">{room?.name}</p>
            </div>
          </div>
        )
       }
      </div>
    </>
  )
}