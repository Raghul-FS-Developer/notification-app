import React, { useState } from 'react'
import "./card.css"
import {AiOutlineHeart, AiOutlineShareAlt, AiFillHeart} from 'react-icons/ai';
import {BiCommentDetail} from 'react-icons/bi';
import {GrCircleInformation} from 'react-icons/gr';

function Card({ post, socket, user }) {
  const [liked, setLiked] = useState(false)
  
  const unclick=()=>{
    setLiked(prev=>!prev)
  }
   const notification = (type) =>{

    if(user == post.username){
    type === 1 && setLiked(true);
   
  }else{
    type === 1 && setLiked(true);
    socket.emit("sendNotification",{
      senderName:user,
      receiverName:post.username,
      type
    })
  }

  }
  return (
    <div className='card'>
      <div className='info'>
        <img src={post.userImg} className='userImg'/>
        <span>{post.username}</span>
      </div>
      <img src={post.postImg} className='postImg'/>
      <div className='interaction'>
        {liked ? (        <AiFillHeart style={{color:"red"}} className='cardIcon'onClick={unclick}/>) : (
        <AiOutlineHeart className='cardIcon' onClick={()=>notification(1)}/>
        )}
        <BiCommentDetail className='cardIcon' onClick={()=>notification(2)}/>
        <AiOutlineShareAlt className='cardIcon' onClick={()=>notification(3)}/>
        {/* <GrCircleInformation className='cardIcon infoIcon'/> */}
      </div>
    </div>
  )
}

export default Card