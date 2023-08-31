// import { FaSearch } from 'react-icons/fa';
// import '../css/profileScree.css'; // Import the CSS file
// import '../css/chatRoom.css';
// import { Button, Image } from 'react-bootstrap';// Import React Bootstrap components
// import ChatComponent from '../Components/ChatComponent';




// const AllFollowing = () => {
  


//   return (
//     <div className="chatRoom-container" >
//    <div className="topHomeLanding">
//         <h3 style={{fontFamily:"phudu",fontSize:"0.8rem"}}>Chat Room</h3>
//         <div className="search-bar-l">
//           <input
//             type="text"
//             placeholder="Search"
//             // value={searchQuery}
//             // onChange={handleSearch}
//           />
//           <button><FaSearch /></button>
//         </div>
//       </div>
// <div className='fullChatDiv'>
//       <div className='chatHistoryContainer'  style={{ maxHeight: "400px", overflowY: "scroll" }}>
       
//             <div className='followingBox' style={{width:"95%"}} >
//               <div className='imageONbox'>
              
//                   <Image  alt="Profile" className="followingImage" roundedCircle />
              
//               </div>
//               <div className='nameOfFollowingUser'>
//                 ansar
//               </div>
//               <div className='unfollowBtn' style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginLeft:"1rem",paddingRight:"1rem",height:"2.5rem"}}>
//               {/* <Button variant="danger" className="unfollow-button" style={{backgroundColor:"#7EAA92",border:"none"}}  >Profile </Button> */}
//                 <Button variant="danger" className="unfollow-button" style={{backgroundColor:"#7EAA92",border:"none",width:"6rem"}}  >Chat </Button>
//               </div>
//             </div>
//             <div className='followingBox' style={{width:"95%"}} >
//               <div className='imageONbox'>
              
//                   <Image  alt="Profile" className="followingImage" roundedCircle />
              
//               </div>
//               <div className='nameOfFollowingUser'>
//                 ansar
//               </div>
//               <div className='unfollowBtn' style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginLeft:"1rem",paddingRight:"1rem",height:"2.5rem"}}>
//               {/* <Button variant="danger" className="unfollow-button" style={{backgroundColor:"#7EAA92",border:"none"}}  >Profile </Button> */}
//                 <Button variant="danger" className="unfollow-button" style={{backgroundColor:"#7EAA92",border:"none",width:"6rem"}}  >Chat </Button>
//               </div>
//             </div>
//             <div className='followingBox' style={{width:"95%"}} >
//               <div className='imageONbox'>
              
//                   <Image  alt="Profile" className="followingImage" roundedCircle />
              
//               </div>
//               <div className='nameOfFollowingUser'>
//                 ansar
//               </div>
//               <div className='unfollowBtn' style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginLeft:"1rem",paddingRight:"1rem",height:"2.5rem"}}>
//               {/* <Button variant="danger" className="unfollow-button" style={{backgroundColor:"#7EAA92",border:"none"}}  >Profile </Button> */}
//                 <Button variant="danger" className="unfollow-button" style={{backgroundColor:"#7EAA92",border:"none",width:"6rem"}}  >Chat </Button>
//               </div>
//             </div>
      
//       </div>
     

// {/* chat page component */}
// {/* <ChatComponent/> */}
// {/* chat page component */}
      
//       </div>



//     </div>
    
//   );
  

  
// };

// export default AllFollowing;




import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Button, Image } from 'react-bootstrap';
import axios from 'axios';
import '../css/profileScree.css';
import '../css/chatRoom.css';
import ChatComponent from '../Components/ChatComponent';
import {toast} from 'react-toastify'


const ChatRoom = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [showChatComponent, setShowChatComponent] = useState(false);




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




  // Function to open the ChatComponent with a specific chat room
  const handleOpenChat = (chatRoomId) => {
    setSelectedChatRoom(chatRoomId);
    setShowChatComponent(true);
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
      <div className='nameOfFollowingUser' style={{color:"white"}}>
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
    </div>
  ))}
</div>



{showChatComponent && <ChatComponent chatRoomId={selectedChatRoom} />}





      </div>
    </div>
  );
};

export default ChatRoom;
