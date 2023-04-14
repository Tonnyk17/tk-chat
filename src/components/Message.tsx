import { MessagePropsType } from "@/types/Messages"
import { Icon } from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"

export const Message =({ data, isMine, editMessage, deleteMessage}: MessagePropsType) => {
  console.log(isMine)
  const { id, message } = data
  return(
    <>
      <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} rounded-lg gap-1`}>
        <img src={data.userImage} alt={data.user} className={`w-7 h-7 rounded-full ${ isMine ? 'hidden': 'inline'}`}/>
        <div className={`p-2 w-auto max-w-4/5 rounded-lg bg-purple-900`}>
          <p className={`text-xs text-cyan-300 mb-1 max-w-40 truncate ${isMine ? 'hidden': 'inline'}`}>
            {data.user}
          </p>
          <div className="w-full flex items-start gap-3">
            <p className="text-sm">
              {data.message}
            </p>
            {
              isMine && 
              <div className="text-cyan-400 hover:text-opacity-100 text-opacity-0 flex items-start gap-2">
                <Icon 
                  component={Edit} 
                  className="text-lg cursor-pointer"
                  onClick={() => editMessage(id, message)}
                />
                <Icon 
                  component={Delete} 
                  className="text-lg cursor-pointer"
                  onClick={() => deleteMessage(id)}
                />
              </div> 
            }
          </div>
        </div>
      </div>   
    </>
  )
}