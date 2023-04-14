import { MessagePropsType } from "@/types/Messages"
import { Icon } from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

export const Message =({ data, isMine, editMessage, deleteMessage}: MessagePropsType) => {
  const { id, message } = data;

  return(
    <>
      <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} rounded-lg gap-1`}>
        <img src={data.userImage} alt={data.user} className={`w-7 h-7 rounded-full ${ isMine ? 'hidden': 'inline'}`}/>
        <div className={`p-2 w-auto max-w-4/5 rounded-lg bg-purple-900`}>
          <p className={`text-xs text-cyan-300 mb-1 max-w-40 truncate ${isMine ? 'hidden': 'inline'}`}>
            {data.user}
          </p>
          <div className="w-full flex items-start gap-3">
            <ReactMarkdown className="text-sm">{data.message}</ReactMarkdown>
            {
              isMine && 
              <div className=" w-p:text-cyan-950 w-p:hover:text-cyan-400 w-d:text-cyan-400 w-d:hover:text-opacity-100 w-d:text-opacity-0 flex items-start w-p:gap-1 w-d:gap-2">
                <Icon 
                  component={Edit} 
                  className="w-p:text-base w-d:text-lg cursor-pointer"
                  onClick={() => editMessage(id, message)}
                />
                <Icon 
                  component={Delete} 
                  className="w-p:text-base w-d:text-lg cursor-pointer"
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