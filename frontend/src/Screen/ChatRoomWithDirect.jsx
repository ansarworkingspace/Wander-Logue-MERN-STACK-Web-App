

import {useEffect,useState} from 'react'
import { FaSearch } from 'react-icons/fa';
import '../css/profileScree.css'; // Import the CSS file
import '../css/chatRoom.css';
import { Button, Image } from 'react-bootstrap';// Import React Bootstrap components
import ChatComponent from '../Components/ChatComponent';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams


const ChatRoomWithDirect = () => {
  const { chatRoomId } = useParams();


  return (
    <div className="chatRoom-container" >
   <div className="topHomeLanding">
        <h3 style={{fontFamily:"phudu",fontSize:"0.8rem"}}>Chat Room</h3>
        <div className="search-bar-l">
          <input
            type="text"
            placeholder="Search"
            // value={searchQuery}
            // onChange={handleSearch}
          />
          <button><FaSearch /></button>
        </div>
      </div>
<div className='fullChatDiv' style={{justifyContent:"center"}}>
    
     

{/* chat page component */}
<ChatComponent chatRoomId={chatRoomId} />

{/* chat page component */}
      
      </div>



    </div>
    
  );
  

  
};

export default ChatRoomWithDirect;