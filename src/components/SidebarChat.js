import React, { useState, useEffect } from 'react'
import {Avatar} from "@material-ui/core";
import './SidebarChat.css'
import Sidebar from './Sidebar';
import db from '../firebase'
import { Link } from 'react-router-dom'


export default function SidebarChat({id, name, addNewChat}) {

    const [seed, setSeed] = useState("")
    const [messages, setMessages] = useState("");
    
    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
    }, [id]);








    useEffect(() => {
        setSeed(Math.floor(Math.random() *  5000))
        
    }, [])

    const CreateChat = () =>{

        const roomName = prompt("Please Enter New Group Name")
        if(roomName)
        {
            db.collection("rooms").add({
                name: roomName
            }) 
        }
  }

    
    return !addNewChat ?(

        <Link to={`/rooms/${id}`} key={id}>

        
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat_info">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
        
    ) : (
        <div onClick={CreateChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}
