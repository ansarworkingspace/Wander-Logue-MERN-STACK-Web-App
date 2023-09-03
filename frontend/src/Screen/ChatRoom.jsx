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
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import {useSelector} from 'react-redux'



const ChatRoom = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [showChatComponent, setShowChatComponent] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [unreadMessages, setUnreadMessages] = useState({});
  const [notificateStatus, setNotificateStatus] = useState({}); // State to store notification status



  useEffect(() => {
    async function fetchChatRooms() {
      try {
        const response = await axios.get('http://localhost:4000/api/users/chatRooms', {
          withCredentials: true,
        });
  //  console.log(response.data.chatRooms);
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





  // // Function to open the ChatComponent with a specific chat room
  // const handleOpenChat = (chatRoomId) => {
  //   setSelectedChatRoom(chatRoomId);
  //   setShowChatComponent(true);

 
  // };

  const handleOpenChat = async (chatRoomId) => {
    setSelectedChatRoom(chatRoomId);

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
          onClick={() => handleOpenChat(chatRoom._id)}
          style={{ backgroundColor: "#7EAA92", border: "none", width: "6rem" }}
        >
          Chat
        </Button>
        
      </div>
      
 {/* <div className='noty'>
 {unreadMessages[chatRoom._id] && <FaBell className='fa-bell' />}
 <FaBell className='fa-bell' /> 

              </div> */}

{/* <div className='noty'>
{chatRoom.messages.some(message => message.sender !== userInfo._id) ? (
                <FaBell className='fa-bell' />
              ) : null}

</div> */}


<div className='noty'>
{/* {unreadMessages[chatRoom._id] && <FaBell className='fa-bell' />} */}
{unreadMessages[chatRoom._id] > 0 && <FaBell className='fa-bell' />}
</div>


    </div>
    
  ))}
</div>



{/* {showChatComponent && <ChatComponent chatRoomId={selectedChatRoom}  />} */}


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



