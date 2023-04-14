import { Loader } from '@/components/Loader';
import { Login } from '@/components/Login';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { isLoading } = useAuth();
  
  return (
    <>
      { isLoading ? 
          <Loader/> 
        :
          <div className='w-full h-screen flex justify-center items-center'>
            <Login/>
          </div>  }
    </>
  )
}
