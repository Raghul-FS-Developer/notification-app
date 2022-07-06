import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/card';
import Navbar from './components/navbar';
import {posts} from './data'
import { io } from "socket.io-client";

function App() {
  const [username,setUsername] = useState("")
  const [user,setUser] = useState("")
  const [socket,setSocket] =useState(null) 
  useEffect(()=>{

    setSocket(io("https://not-back.herokuapp.com"));
  
  },[]);

  useEffect(()=>{
    socket?.emit("newUser", user)
  },[socket,user])

  return (
  <div className='container'>
  {user ? (
    <>
     <Navbar socket={socket} user={user}/>
     <div className='cardmain'>
    {posts.map((post)=>(
      <Card key={post.id} post={post} socket={socket} user={user}/>
    ))}
    </div>
    </>
  ) : (
    <>
  <h1 className='head'>Socket App</h1>
  <div className='login'>
    <input  type='text' placeholder='username' onChange={(e)=>setUsername(e.target.value)}/>
    <button onClick={()=>setUser(username)}>Login</button>
  </div>
  </>
  )}
</div>
  );
}

export default App;
