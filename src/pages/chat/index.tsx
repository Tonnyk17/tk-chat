import { UserAuth } from "@/context/AuthContext"

export default function Chat() {
  const { user, signOutGoogle } = UserAuth();

  const logout = () => {
    try {
      signOutGoogle();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='w-full h-screen flex justify-center items-center'>
        <button onClick={logout}>SignOut</button>
      </div>
    </>
  )
}