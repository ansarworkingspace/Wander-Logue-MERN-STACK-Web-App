//orginal
// import React, { useState, useEffect } from 'react';
// import { FaSearch } from 'react-icons/fa';
// import { Button, Image } from 'react-bootstrap';
// import axios from 'axios';
// import '../css/profileScree.css';
// import '../css/chatRoom.css';
// import ChatComponent from '../Components/ChatComponent';
// import {toast} from 'react-toastify'
// import { FaBell } from 'react-icons/fa';


// const ChatRoom = () => {
//   const [chatRooms, setChatRooms] = useState([]);
//   const [selectedChatRoom, setSelectedChatRoom] = useState(null);
//   const [showChatComponent, setShowChatComponent] = useState(false);




//   useEffect(() => {
//     async function fetchChatRooms() {
//       try {
//         const response = await axios.get('http://localhost:4000/api/users/chatRooms', {
//           withCredentials: true,
//         });

//         setChatRooms(response.data.chatRooms);
//       } catch (error) {
//         toast.error('Error fetching chat rooms');
//       }
//     }

//     fetchChatRooms();
//   }, []);




//   // Function to open the ChatComponent with a specific chat room
//   const handleOpenChat = (chatRoomId) => {
//     setSelectedChatRoom(chatRoomId);
//     setShowChatComponent(true);
//   };




//   return (
//     <div className="chatRoom-container">
//       <div className="topHomeLanding">
//         <h3>Chat Room</h3>
//         <div className="search-bar-l">
//           <input type="text" placeholder="Search" />
//           <button><FaSearch /></button>
//         </div>
//       </div>
//       <div className='fullChatDiv'>
   



// <div className='chatHistoryContainer' style={{ maxHeight: "400px", overflowY: "scroll" }}>
//   {chatRooms.map(chatRoom => (
//     <div className='followingBox' key={chatRoom._id}>
//       <div className='imageONbox'>
//         {chatRoom.otherParticipant.profileImage ? (
//           <Image
//             src={`http://localhost:4000/api/users/uploads/${chatRoom.otherParticipant.profileImage}`}
//             alt="Profile"
//             className="followingImage"
//             roundedCircle
//             style={{height:"77%"}}
//           />
//         ) : (
//           <div className="profile-initials" style={{color:"white"}}>
//             {chatRoom.otherParticipant.name ? chatRoom.otherParticipant.name.charAt(0).toUpperCase() : ''}
//           </div>
//         )}
//       </div>
//       <div className='nameOfFollowingUser' style={{color:"white",width:"30%"}}>
//         {chatRoom.otherParticipant.name}
//       </div>
//       <div className='unfollowBtn'>
//         <Button
//           variant="danger"
//           className="unfollow-button"
//           onClick={() => handleOpenChat(chatRoom._id)}
//           style={{ backgroundColor: "#7EAA92", border: "none", width: "6rem" }}
//         >
//           Chat
//         </Button>
        
//       </div>
//       {/* <div className='noty'>

//         </div> */}
// <div className='noty'>
//       <FaBell  className='fa-bell'  /> {/* This will render the Font Awesome bell icon */}
//     </div>

//     </div>
//   ))}
// </div>



// {showChatComponent && <ChatComponent chatRoomId={selectedChatRoom} />}





//       </div>
//     </div>
//   );
// };

// export default ChatRoom;


//working for notification
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Button, Image } from 'react-bootstrap';
import axios from 'axios';
import '../css/profileScree.css';
import '../css/chatRoom.css';
import ChatComponent from '../Components/ChatComponent';
import {toast} from 'react-toastify'
import { FaBell } from 'react-icons/fa';
import {useSelector} from 'react-redux'
import io from 'socket.io-client';


const ChatRoom = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [showChatComponent, setShowChatComponent] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [unreadMessages, setUnreadMessages] = useState({});
  const [notificateStatus, setNotificateStatus] = useState({}); // State to store notification status
  const socket = io('http://localhost:4000'); 

  const [socketConnected, setSocketConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentChatRoomId, setCurrentChatRoomId] = useState(null);













  async function makeNotification(messageId, newMessageRoomId) {
    try {
      // Send a POST request to update the chat room's notification field
      const response = await axios.post(`http://localhost:4000/api/users/updateNoti/${newMessageRoomId}`, { messageId });
      // You can handle the response here if needed
      // console.log('Notification response:', response.data);
    } catch (error) {
      console.error('Error making notification request:', error);
    }
  }
  


useEffect(() => {



//TESTING 

const updateChatRoomOrder = (roomId) => {
  setChatRooms((prevChatRooms) => {
    // Create a copy of the chat rooms array
    const updatedChatRooms = [...prevChatRooms];
    // Find the index of the chat room with the roomId
    const roomIndex = updatedChatRooms.findIndex((room) => room._id === roomId);
    // If the chat room exists, move it to the top
    if (roomIndex !== -1) {
      const movedRoom = updatedChatRooms.splice(roomIndex, 1)[0];
      updatedChatRooms.unshift(movedRoom);
    }
    return updatedChatRooms;
  });
};








  socket.on('message received', (newMessageReceived) => {


    if (newMessageReceived.sender._id !== userInfo._id) {
      if (  currentChatRoomId !== newMessageReceived.room._id) {
        // Add notification logic here if needed
        setUnreadMessages((prevState) => ({
          ...prevState,
          [newMessageReceived.room._id]: true, // Set to true when a new message is received
        }));
      } else if (newMessageReceived.sender._id !== userInfo._id) {
        setMessages([...messages, newMessageReceived]);
      }

      updateChatRoomOrder(newMessageReceived.room._id); 

    }
    
  }, [currentChatRoomId]);

  socket.on('new message notification', (newMessageReceived) => {


    if (
      currentChatRoomId !== newMessageReceived.room._id &&
      newMessageReceived.sender._id !== userInfo._id
    ) {
      // Update your notification state or perform other actions
      // console.log('New message notification received:', newMessageReceived);

      const { _id: messageId, room } = newMessageReceived;
      const roomId = room._id;

      // Call makeNotification with the extracted message ID and room ID
      makeNotification(messageId, roomId);
    }
  });
}, [currentChatRoomId]);


//-------------------------------------------------------------------------------------------------


//PAGE REFRESH USER EXIT FROM ALL CHAT ROOM 
useEffect(() => {
  socket.emit("setup",userInfo)
  socket.on("connected",()=>setSocketConnected(true))

  return () => {
    if (chatRooms.length > 0) {
      
      chatRooms.forEach((chatRoom) => {
        // console.log(chatRoom._id);
        // Emit a leaveRoom event when the component unmounts
        socket.emit('leaveRoom', { room: chatRoom._id });
      });
    }



  };
}, [chatRooms]);





  useEffect(() => {
    async function fetchChatRooms() {
      try {
        const response = await axios.get('http://localhost:4000/api/users/chatRooms', {
          withCredentials: true,
        });
  



        setChatRooms(response.data.chatRooms);
      } catch (error) {
        toast.error('Error fetching chat rooms');
      }
    }

    fetchChatRooms();
    
  }, []);




//check current notifiaction status
useEffect(() => {
  // Fetch the notification status when the component mounts
  const fetchNotificationStatus = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users/notificationStatus', {
        withCredentials: true,
      });
      // Assuming the response contains notification status for each chat room
      setNotificateStatus(response.data);



  // Update the unreadMessages state based on the notification status
  const updatedUnreadMessages = {};
  for (const chatRoomId in response.data) {
    updatedUnreadMessages[chatRoomId] = response.data[chatRoomId] ? 1 : 0;
  }
  setUnreadMessages(updatedUnreadMessages);



    } catch (error) {
      console.error('Error fetching notification status:', error);
    }
  };

  fetchNotificationStatus();


}, []);




  const handleOpenChat = async (chatRoomId,chatRoom) => {
    setSelectedChatRoom(chatRoomId);

    setCurrentChatRoomId(chatRoomId);


    // Make an API request to delete messages by chat room ID
    try {
      await axios.delete(`http://localhost:4000/api/users/deleteMessageId/${chatRoomId}`, {
        withCredentials: true,
      });






   // After deleting messages, update the unreadMessages state to mark this chat room as read
   setUnreadMessages((prevState) => ({
    ...prevState,
    [chatRoomId]: false, // Mark this chat room as read
  }));



      // After deleting messages, you can proceed to open the chat component
      setShowChatComponent(true);
    } catch (error) {
      console.error('Error deleting messages:', error);
    }
  };


  return (
    <div className="chatRoom-container">
      <div className="topHomeLanding">
        <h3>Chat Room</h3>
        <div className="search-bar-l">
          <input type="text" placeholder="Search" />
          <button><FaSearch /></button>
        </div>
      </div>
      <div className='fullChatDiv'>
   



<div className='chatHistoryContainer' style={{ maxHeight: "400px", overflowY: "scroll" }}>
  {chatRooms.map(chatRoom => (
  
    <div className='followingBox' key={chatRoom._id}>
      <div className='imageONbox'>
        {chatRoom.otherParticipant.profileImage ? (
          <Image
            src={`http://localhost:4000/api/users/uploads/${chatRoom.otherParticipant.profileImage}`}
            alt="Profile"
            className="followingImage"
            roundedCircle
            style={{height:"77%"}}
          />
        ) : (
          <div className="profile-initials" style={{color:"white"}}>
            {chatRoom.otherParticipant.name ? chatRoom.otherParticipant.name.charAt(0).toUpperCase() : ''}
          </div>
        )}
      </div>
      <div className='nameOfFollowingUser' style={{color:"white",width:"30%"}}>
        {chatRoom.otherParticipant.name}
      </div>
      <div className='unfollowBtn'>
        <Button
          variant="danger"
          className="unfollow-button"
          onClick={() => handleOpenChat(chatRoom._id,chatRoom)}
          style={{ backgroundColor: "#7EAA92", border: "none", width: "6rem" }}
        >
          Chat
        </Button>
        
      </div>
      



<div className='noty'>
{unreadMessages[chatRoom._id] > 0 && <FaBell className='fa-bell' />}
</div>


    </div>
    
  ))}
</div>




{showChatComponent && (
          <ChatComponent
            chatRoomId={selectedChatRoom}
            unreadMessages={unreadMessages}
            setUnreadMessages={setUnreadMessages}
          />
        )}


      </div>
    </div>
  );
};

export default ChatRoom;



