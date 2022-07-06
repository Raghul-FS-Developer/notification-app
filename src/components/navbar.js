import React, { useEffect, useState } from "react";
import "./navbar.css";
import { IoMdNotifications } from "react-icons/io";
import { RiMessage2Fill } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";

function Navbar({ socket,user }) {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
      socket.on("getNotification", (data) => {
        setNotifications((prev) => [...prev, data]);
      });
    }, [socket]);
    




    const displayNotification = ({ senderName, type }) => {
      let action;
  
      if (type === 1) {
        action = "liked";
      } else if (type === 2) {
        action = "commented";
      } else {
        action = "shared";
      }
      return (
        
        <span className="notification">{action === 'commented' ?`${senderName} ${action} on your post.`:`${senderName} ${action} your post.`}</span>
       
      
      );
    };
  
    const handleRead = () => {
      setNotifications([]);
      setOpen(false);
    };
  
    return (
      <div className="navbar">
        <span className="logo">Socket App</span>
        
        <span className='username'>{user}</span>
        <div className="icons">
          <div className="icon" onClick={() => setOpen(!open)}>
            <IoMdNotifications className="iconImg"  />
            {
  notifications.length >0 &&
              <div className="counter">{notifications.length}</div>
            }
          </div>
          
          <div className="icon">
            <  RiMessage2Fill className="iconImg" />
          </div>
          <div className="icon" >
            < AiFillSetting  className="iconImg"  />
           </div>
        </div>
        
        {open && (
          <div className="notifications" style={{right:notifications.length >0?'30px':"80px"}}>
            {notifications.map((n) => displayNotification(n))}
            <button className="nButton" onClick={handleRead}>
              Mark as read
            </button>
          </div>
        )}
 
      </div>
    );
  };
  


export default Navbar;
