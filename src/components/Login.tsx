import { UserAuth } from '@/context/AuthContext'
import { Icon } from '@mui/material'
import { Google } from '@mui/icons-material'

export const Login = () => {

  const { signInGoogle, user } = UserAuth();

  const login = async () => {
    try {
      signInGoogle();
    } catch (error) {
      console.log(error)
    }
  }

  //console.log(user, 'Login')
  return(
    <>
      <div className="w-80 h-80 bg-cyan-800 bg-opacity-80 rounded-xl border-2 border-cyan-300 flex flex-col items-center pt-20">
        <p className='text-2xl pb-10 font-bold'>
          Welcome to Tk chat
        </p>
        <button onClick={login} className=' bg-purple-900 p-2 rounded-md hover:opacity-70 flex gap-2'>
          <Icon component={Google} fontSize={'medium'}/><span>Sign in with Google</span>
        </button>
      </div>
    </>
  )
}