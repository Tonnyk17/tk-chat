import { useAuth } from "@/context/AuthContext"
import { Add } from "@mui/icons-material"
import { Icon } from "@mui/material"

export const AddChat = () => {
  const { closeModal } = useAuth();

  return(
    <>
      <div 
        className="w-p:rounded-none w-t:rounded-none w-full h-full bg-cyan-950 bg-opacity-70 rounded-r-xl flex flex-col justify-center items-center gap-4 hover:bg-cyan-800 hover:opacity-80 cursor-pointer"
        onClick={closeModal}  
      >
        <Icon 
          component={Add} 
          fontSize={"large"} 
          className=" bg-cyan-600 rounded-full bg-opacity-95"
        />
        <p className=" text-cyan-300">
          Click to create a chat room
        </p>
      </div>   
    </>
  )
}