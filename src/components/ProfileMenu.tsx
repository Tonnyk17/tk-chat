import { Icon } from '@mui/material'
import { Logout } from '@mui/icons-material'
import { UserAuth } from "@/context/AuthContext"

export const ProfileMenu = ({source, name}: any) => {
  const { signOutGoogle } = UserAuth();

  const logout = () => {
    try {
      signOutGoogle();
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <>
      <div className="w-full h-20 flex items-center justify-between gap-4">
        <Icon component={Logout} fontSize={'large'} className=" hover:text-cyan-300 cursor-pointer" onClick={logout}/>
        <p className='text-base text-cyan-300 font-semibold text-center'>
          {name}
        </p>
        <img src={source} alt="" className='w-16 h-16 rounded-full'/>
      </div>
    </>
  )
}