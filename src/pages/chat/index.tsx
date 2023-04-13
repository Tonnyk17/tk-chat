import { ProfileMenu } from "@/components/ProfileMenu";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "@/components/Loader";

export default function Chat() {
  const { user, isLoading } = useAuth();


  return (
    <>
      { isLoading ? 
          <Loader/>
        :
        <div className='w-full h-screen flex justify-center items-center'>
          <div className="w-5/6 h-4/5 bg-cyan-800 bg-opacity-80 rounded-xl border-2 border-cyan-300 flex shadow-md shadow-cyan-300"> 
            <div className="w-1/3 bg-cyan-900 bg-opacity-60 h-full rounded-s-xl border-r border-cyan-300 p-5 flex">
              <ProfileMenu source={user?.photoURL} name={user?.displayName}/>  
            </div>      
          </div>
        </div>
      }    
    </>
  )
}