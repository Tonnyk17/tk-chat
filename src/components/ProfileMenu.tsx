import { Icon } from '@mui/material'
import { Logout, Add } from '@mui/icons-material'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

export const ProfileMenu = ({source, name}: any) => {
  const { signOutGoogle, closeModal } = useAuth();
  const router = useRouter()

  const handleLogout = async() => {
    signOutGoogle()
    router.push('/')
  }

  return(
    <>
      <div className="w-full h-20 flex items-center justify-between gap-4 p-5">
        <div className="flex gap-2 items-center">
          <img src={source} alt="" className='w-10 h-10 rounded-full'/>
          <p className='text-base text-cyan-300 font-semibold'>
              {name}
          </p>
        </div>
        <div className="flex gap-2">
          <Icon component={Add} fontSize={'medium'} className=" hover:text-cyan-300 cursor-pointer" onClick={closeModal}/>
          <Icon component={Logout} fontSize={'medium'} className=" hover:text-cyan-300 cursor-pointer" onClick={handleLogout}/>                 
        </div>
      </div>
    </>
  )
}