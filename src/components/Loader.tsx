import { CircularProgress } from '@mui/material'

export const Loader = () => {
  return(
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-gray-800  bg-opacity-80">
        <CircularProgress color='secondary' size={'70px'}/>
      </div>
    </>
  )
}