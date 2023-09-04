//orginal
// import React, { useState,useEffect,useRef }  from 'react';
// import { Image, Button } from 'react-bootstrap'; // Assuming you are using Bootstrap components
// import {useNavigate} from 'react-router-dom'
// import '../css/chatRoom.css'
// import '../css/viewBlog.css'
// import '../css/profileScree.css'; // Import the CSS file
// import axios from 'axios'; // Import Axios for making API requests
// import { useSelector } from 'react-redux';
// import io from 'socket.io-client'
// import Lottie from "lottie-react";
// import animationData from '../animation/animation_llz6cgwy.json'



// const ENDPOINT = 'http://localhost:4000';
// var socket , selectedChatCompare;

// const ChatComponent = ({ chatRoomId }) => {


  
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const { userInfo } = useSelector((state) => state.auth);
//   const chatContentRef = useRef(null);
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [selectedChat, setSelectedChat] = useState();
//   const navigate = useNavigate()
//   const [typing, setTyping] = useState(false);
//   const [istyping, setIsTyping] = useState(false);





//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };



  
//   useEffect(()=>{
//     socket = io(ENDPOINT)
//     socket.emit("setup",userInfo)
//     socket.on("connected",()=>setSocketConnected(true))

//     socket.on("typing", () => setIsTyping(true));
//     socket.on("stop typing", () => setIsTyping(false));



//  },[])
 



// useEffect(() => {
//   fetchMessages();
// }, [chatRoomId]);



// useEffect(() => {
//   socket.on('message received', (newMessageRecived) => {
//     // console.log("Received new message IN FREND:", newMessageRecived);
//     if (newMessageRecived.sender._id !== userInfo._id) {
//       if (!chatRoomId || chatRoomId !== newMessageRecived.room._id) {
//         // Add notification logic here if needed
       
//       } else {
//         setMessages([...messages, newMessageRecived]);
      
//       }
//     }
//   });
// });





//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:4000/api/users/chatMessages/${chatRoomId}`,
//         {
//           withCredentials: true,
//         }
//       );

//       setMessages(response.data.messages);
//       socket.emit('join chat', chatRoomId);

//       chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
//     } catch (error) {
//       console.error('Error fetching chat messages:', error);
//     }
//   };



  


//   const handleSendMessage = async () => {
//     if (message.trim() === '') return;
//     socket.emit("stop typing", chatRoomId);
//     try {
//       const { data } = await axios.post(
//         `http://localhost:4000/api/users/chatSend/${chatRoomId}`,
//         {
//           content: message,
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       const newMessage = data.newChatMessage;

      
//       socket.emit("new message", {
//         room: chatRoomId,
//         sender: newMessage.sender,
//         ...newMessage,
//       });
      


//       setMessage('');
//       fetchMessages();
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   useEffect(() => {
//     chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
//   }, [messages]);




// // find participents
// useEffect(() => {
//   if (chatRoomId) {
//     axios.get(`http://localhost:4000/api/users/participants/${chatRoomId}`, {
//       withCredentials: true
//     })
//       .then(response => {
//         const participantsData = response.data;

//         // Find the participant who is not the current user
//         const otherParticipant = participantsData.find(participant => participant._id !== userInfo._id);

//         setSelectedChat(otherParticipant);
//         // console.log("otherParticipant:", otherParticipant); 
//       })
//       .catch(error => {
//         console.error('Error fetching participants:', error);
//       });
//   }
// }, [chatRoomId]);




// //typingHandeler
// const typingHandler = (e) => {
//   setMessage(e.target.value);

//   if (!socketConnected) return;

//   if (!typing) {
//     setTyping(true);
//     socket.emit("typing", chatRoomId);
//   }
//   let lastTypingTime = new Date().getTime();
//   var timerLength = 3000;
//   setTimeout(() => {
//     var timeNow = new Date().getTime();
//     var timeDiff = timeNow - lastTypingTime;
//     if (timeDiff >= timerLength && typing) {
//       socket.emit("stop typing", chatRoomId);
//       setTyping(false);
//     }
//   }, timerLength);
// };


//   return (
//     <div className='chatPageContainer'  style={{ maxHeight: "400px", position: "relative" }}>
//       <div className='followingBox' style={{ width: "77%", marginLeft: "4rem", marginTop: "1rem", height: "3rem" }}>
//         <div className='imageONbox' style={{ height: "3rem" }}>
//         {selectedChat && selectedChat.profileImage ? (
//       <Image style={{width:"43%",height:"80%"}} src={`http://localhost:4000/api/users/uploads/${selectedChat.profileImage}`} alt="Profile" className="followingImage" roundedCircle />
//     ) : (
//       <div className="profile-initials">{selectedChat && selectedChat.name ? selectedChat.name.charAt(0).toUpperCase() : ''}</div>
//     )}
//         </div>
//         <div className='nameOfFollowingUser' style={{ height: "3rem" ,marginTop:"0.8rem",marginLeft:"4rem",color:"white"}}>
//         {selectedChat?.name}
//         </div>

//         <div className='unfollowBtn' style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginLeft: "1rem", paddingRight: "1rem", height: "2.5rem" }}>
//           <Button variant="danger" className="unfollow-button" style={{ backgroundColor: "#7EAA92", border: "none", width: "6rem", marginLeft: "2.6rem", marginBottom: "0.8rem", fontSize: "0.7rem" }} onClick={()=>navigate(`/otherUserPro/${selectedChat._id}`)}>Profile</Button>
//         </div>
//       </div>

//       <div className="chatContent" ref={chatContentRef}   style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
//       {messages.map((msg) => (
//   <div key={msg._id} className={msg.sender === userInfo._id ? 'chatBYme' : 'chatBYother'}>
//             <div className='userName' style={{ paddingTop: "0.4rem" }}>
//               <h4 className='commentH4'>{msg.sender === userInfo._id ? 'Me' : msg.senderName}</h4>
//             </div>
//             <div className='commentText'>
//               <h3 className='commentH3'>{msg.content}</h3>
//             </div>
//             <div className='commentTime' style={{ paddingBottom: "0.1rem" }}>
//               <h5 className='commentH5'>4.20pm</h5>
//             </div>
//           </div>
//         ))}
//       </div>

//       {istyping?
// <div className='typingLoding'>

// {/* <Lottie
//  options={defaultOptions}
//  height={50}
//  width={70}
//  style={{ marginBottom: 15, marginLeft: 0 }}
// /> */}
// typing.......

// </div>:<></>}




//       <div className="inputContainer" style={{ position: "sticky", bottom: 0, backgroundColor: "rgb(5, 80, 73)", padding: "1rem", display: "flex", alignItems: "center" }}>
//         <input
//           style={{ boxShadow: "0px 0px 0px 0 #352a2a", marginRight: "1rem" }}
//           type="text"
//           placeholder="Enter your message"
//           className="blog-input-field"
//           value={message}
//           onChange={typingHandler}
//           // onChange={(e) => setMessage(e.target.value)}
//         />
//         <Button
//           variant="danger"
//           className="unfollow-button"
//           style={{ backgroundColor: "#7EAA92", border: "none", width: "6rem" }}
//           onClick={handleSendMessage}
//         >
//           Chat
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default ChatComponent;





import React, { useState,useEffect,useRef }  from 'react';
import { Image, Button } from 'react-bootstrap'; // Assuming you are using Bootstrap components
import {useNavigate} from 'react-router-dom'
import '../css/chatRoom.css'
import '../css/viewBlog.css'
import '../css/profileScree.css'; // Import the CSS file
import axios from 'axios'; // Import Axios for making API requests
import { useSelector } from 'react-redux';
import io from 'socket.io-client'
import Lottie from "lottie-react";
import animationData from '../animation/animation_llz6cgwy.json'



const ENDPOINT = 'http://localhost:4000';
var socket , selectedChatCompare;

const ChatComponent = ({ chatRoomId, unreadMessages, setUnreadMessages }) => {


  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const chatContentRef = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [selectedChat, setSelectedChat] = useState();
  const navigate = useNavigate()
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [notification, setNotification] = useState([]);
  // const [selectedRoom,setSelectedRoom] = useState(false) 



  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };



  
  useEffect(()=>{
    socket = io(ENDPOINT)
    socket.emit("setup",userInfo)
    socket.on("connected",()=>setSocketConnected(true))

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

 // Cleanup function to leave the socket room when the component unmounts
 return () => {
  socket.off("setup",userInfo._id);
  // socket.emit("leaveRoom", { room: chatRoomId }); // Emit a leave event
  socket.disconnect(); // Disconnect the socket connection
};

 },[])
 








useEffect(() => {
  fetchMessages();
  
}, [chatRoomId]);


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


//ORGINAL CODE FOR REAL TIME CHAT AND NOTIFY
// useEffect(() => {
//   socket.on('message received', (newMessageRecived) => {
//     // console.log("Received new message IN FREND:", newMessageRecived);
//     if (newMessageRecived.sender._id !== userInfo._id) {
//       if (!chatRoomId || chatRoomId !== newMessageRecived.room._id) {
//         // Add notification logic here if needed
  
//       setUnreadMessages((prevState) => ({
//         ...prevState,
//         [newMessageRecived.room._id]: true, // Set to true when a new message is received
//       }));

//       } else {
//       //  console.log(newMessageRecived);
//         setMessages([...messages, newMessageRecived]);
      
//       }
//     }
//   },[chatRoomId]);




// socket.on('new message notification', (newMessageRecived) => {
//   if (newMessageRecived.roomId !== chatRoomId && newMessageRecived.senderId !== userInfo._id) {
//     // Update your notification state or perform other actions
//     console.log('New message notification received:', newMessageRecived);

//     // Extract the message ID and room ID from the received message object
//     const { _id: messageId, room } = newMessageRecived;
//     const roomId = room._id;
    
//     // console.log('messageId:', messageId);
//     // console.log('roomId:', roomId);

//     // Call makeNotification with the extracted message ID and room ID
//     makeNotification(messageId, roomId);
//   }
// });


// });


//CHECKING BUG AND FIXING CODE

useEffect(() => {
  socket.on('message received', (newMessageRecived) => {
    

    // console.log("Received new message IN FREND:", newMessageRecived);
    if (newMessageRecived.sender._id !== userInfo._id) {
      if (!chatRoomId || chatRoomId !== newMessageRecived.room._id) {
        // Add notification logic here if needed
  
      setUnreadMessages((prevState) => ({
        ...prevState,
        [newMessageRecived.room._id]: true, // Set to true when a new message is received
      }));

      } else {
     
        setMessages([...messages, newMessageRecived]);
      
      }
      
    }
  },[chatRoomId]);




socket.on('new message notification', (newMessageRecived) => {


  if ( newMessageRecived.roomId !== chatRoomId && newMessageRecived.senderId !== userInfo._id) {
    // Update your notification state or perform other actions
    // console.log('New message notification received:', newMessageRecived);

    // Extract the message ID and room ID from the received message object
    const { _id: messageId, room } = newMessageRecived;
    const roomId = room._id;
    
    // console.log('messageId:', messageId);
    // console.log('roomId:', roomId);

    // Call makeNotification with the extracted message ID and room ID
    makeNotification(messageId, roomId);
  }
});


});





//------------------------------------------

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/users/chatMessages/${chatRoomId}`,
        {
          withCredentials: true,
        }
      );

      // console.log(response.data);

      setMessages(response.data.messages);
      socket.emit('join chat', chatRoomId);

      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };



  


  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    socket.emit("stop typing", chatRoomId);
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/users/chatSend/${chatRoomId}`,
        {
          content: message,
        },
        {
          withCredentials: true,
        }
      );

      const newMessage = data.newChatMessage;

      
      socket.emit("new message", {
        room: chatRoomId,
        sender: newMessage.sender,
        ...newMessage,
      });
      


      setMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
  }, [messages]);




// find participents
useEffect(() => {
  if (chatRoomId) {
    axios.get(`http://localhost:4000/api/users/participants/${chatRoomId}`, {
      withCredentials: true
    })
      .then(response => {
        const participantsData = response.data;

        // Find the participant who is not the current user
        const otherParticipant = participantsData.find(participant => participant._id !== userInfo._id);

        setSelectedChat(otherParticipant);
        // console.log("otherParticipant:", otherParticipant); 
      })
      .catch(error => {
        console.error('Error fetching participants:', error);
      });
  }
}, [chatRoomId]);




//typingHandeler
const typingHandler = (e) => {
  setMessage(e.target.value);

  if (!socketConnected) return;

  if (!typing) {
    setTyping(true);
    socket.emit("typing", chatRoomId);
  }
  let lastTypingTime = new Date().getTime();
  var timerLength = 3000;
  setTimeout(() => {
    var timeNow = new Date().getTime();
    var timeDiff = timeNow - lastTypingTime;
    if (timeDiff >= timerLength && typing) {
      socket.emit("stop typing", chatRoomId);
      setTyping(false);
    }
  }, timerLength);
};


  return (
    <div className='chatPageContainer'  style={{ maxHeight: "400px", position: "relative" }}>
      <div className='followingBox' style={{ width: "77%", marginLeft: "4rem", marginTop: "1rem", height: "3rem" }}>
        <div className='imageONbox' style={{ height: "3rem" }}>
        {selectedChat && selectedChat.profileImage ? (
      <Image style={{width:"43%",height:"80%"}} src={`http://localhost:4000/api/users/uploads/${selectedChat.profileImage}`} alt="Profile" className="followingImage" roundedCircle />
    ) : (
      <div className="profile-initials">{selectedChat && selectedChat.name ? selectedChat.name.charAt(0).toUpperCase() : ''}</div>
    )}
        </div>
        <div className='nameOfFollowingUser' style={{ height: "3rem" ,marginTop:"0.8rem",marginLeft:"4rem",color:"white"}}>
        {selectedChat?.name}
        </div>

        <div className='unfollowBtn' style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginLeft: "1rem", paddingRight: "1rem", height: "2.5rem" }}>
          <Button variant="danger" className="unfollow-button" style={{ backgroundColor: "#7EAA92", border: "none", width: "6rem", marginLeft: "2.6rem", marginBottom: "0.8rem", fontSize: "0.7rem" }} onClick={()=>navigate(`/otherUserPro/${selectedChat._id}`)}>Profile</Button>
        </div>
      </div>

      <div className="chatContent" ref={chatContentRef}   style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
      {messages.map((msg) => (
  <div key={msg._id} className={msg.sender === userInfo._id ? 'chatBYme' : 'chatBYother'}>
            <div className='userName' style={{ paddingTop: "0.4rem" }}>
              <h4 className='commentH4'>{msg.sender === userInfo._id ? 'Me' : msg.senderName}</h4>
            </div>
            <div className='commentText'>
              <h3 className='commentH3'>{msg.content}</h3>
            </div>
            <div className='commentTime' style={{ paddingBottom: "0.1rem" }}>
              <h5 className='commentH5'>4.20pm</h5>
            </div>
          </div>
        ))}
      </div>

      {istyping?
<div className='typingLoding'>

{/* <Lottie
 options={defaultOptions}
 height={50}
 width={70}
 style={{ marginBottom: 15, marginLeft: 0 }}
/> */}
typing.......

</div>:<></>}




      <div className="inputContainer" style={{ position: "sticky", bottom: 0, backgroundColor: "rgb(5, 80, 73)", padding: "1rem", display: "flex", alignItems: "center" }}>
        <input
          style={{ boxShadow: "0px 0px 0px 0 #352a2a", marginRight: "1rem" }}
          type="text"
          placeholder="Enter your message"
          className="blog-input-field"
          value={message}
          onChange={typingHandler}
          // onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="danger"
          className="unfollow-button"
          style={{ backgroundColor: "#7EAA92", border: "none", width: "6rem" }}
          onClick={handleSendMessage}
        >
          Chat
        </Button>
      </div>
    </div>
  );
}

export default ChatComponent;