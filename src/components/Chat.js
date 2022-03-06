import React, { useState, useEffect } from 'react'
import './Chat.css'
import {Avatar, IconButton} from "@material-ui/core";
import { AttachFile, SearchOutlined, InsertEmoticon } from '@material-ui/icons';
import MoreVert from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic'
import db from '../firebase'
import firebase from '../firebase';
import {useParams} from 'react-router-dom'
import {useStateValue} from "./StateProvider";


export default function Chat() {
    const [seed, setSeed]= useState("")
    const [roomName, setRoomName]= useState("")
    const [messages, setMessages]= useState([])
    const [{user}, dispatch] = useStateValue()


    

   

   const [input, setInput] = useState("")
   const {roomId} = useParams()

   useEffect(()=>{

    if(roomId){
        db.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
          setRoomName(snapshot.data().name)  
        })


        db.collection('rooms').doc(roomId).collection("messages").onSnapshot(snapshot =>{
            setMessages(snapshot.docs.map(doc=>doc.data()))
        })
   
   
    }


   },[roomId])
  


    useEffect(() => {
        setSeed(Math.floor(Math.random()* 5000))
        
    }, [])

    const sendMessage = e =>{
       e.preventDefault()
       if(input===""){
           return alert("Please enter message")
       }
       db.collection("rooms").doc(roomId).collection("messages").add({

        message:input,
        name:user.displayName,
        
       })
       setInput('')
    }

    return (
        <div className="chat">
            <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
       
       <div className="Chat_headerInfo">
           <h3>{roomName}</h3>
           {/* <p>Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toUTCString()}</p> */}
       </div>

       <div className="chat_headerRight">
             <IconButton>
                 <SearchOutlined/>
             </IconButton>

             <IconButton>
                 <AttachFile/>
             </IconButton>
             <IconButton>
                 <MoreVert/>
             </IconButton>
       </div>
       </div>
          <div className="chat_body">
              {messages.map(message=>(

              <p className={`chat_message ${message.name === user.displayName && 'chat_receiver'}`}>
                  <span className="chat_name">{message.name}</span>

                  {message.message}
                
              </p>
              ))}

              
          </div>

       

          <div className="chat_footer">

           <InsertEmoticon/>
           <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button type="submit" onClick={sendMessage}> Send a Message</button>
                </form>
           <MicIcon/>
           
          
          
          </div>
       
        </div>
    )
}
