import { MessagePropsType } from "@/types/Messages"

export const Message =({ data, isMine}: MessagePropsType) => {
  console.log(data)
  return(
    <>
      <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} rounded-lg gap-1`}>
        <img src={data.userImage} alt={data.user} className={`w-7 h-7 rounded-full ${ isMine ? 'hidden': 'inline'}`}/>
        <div className={`p-2 w-auto max-w-1/2 rounded-lg bg-purple-900`}>
          <p className={`text-xs text-cyan-300 mb-1 max-w-40 truncate ${isMine ? 'hidden': 'inline'}`}>
            {data.user}
          </p>
          <p className="text-sm">
            {data.message}
          </p>
        </div>
      </div>   
    </>
  )
}