
// import React, { useState,useEffect,useRef }  from 'react';
// import { Image, Button } from 'react-bootstrap'; // Assuming you are using Bootstrap components
// import '../css/chatRoom.css'
// import '../css/viewBlog.css'
// import '../css/profileScree.css'; // Import the CSS file
// import axios from 'axios'; // Import Axios for making API requests
// import { useSelector } from 'react-redux';





// const ChatComponent = ({ chatRoomId }) => {

//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const { userInfo } = useSelector((state) => state.auth);
//   const chatContentRef = useRef(null);


//   useEffect(() => {
//     fetchMessages();
//   }, [chatRoomId]);





//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/users/chatMessages/${chatRoomId}`, {
//         withCredentials: true,
//       });

//       setMessages(response.data.messages);
//       // chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
//       chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
//     } catch (error) {
//       console.error('Error fetching chat messages:', error);
//     }
//   };






//   const handleSendMessage = async () => {
//     if (message.trim() === '') return; // Don't send empty messages

//     try {
//       await axios.post(
//         `http://localhost:4000/api/users/chatSend/${chatRoomId}`,
//         {
//           content: message
//         },
//         {
//           withCredentials: true // Include cookies in the request
//         }
//       );
//       // Clear the input after sending the message
//       setMessage('');

    

//       fetchMessages();
//       // chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;

//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };


//   useEffect(() => {
//     chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
//   }, [messages]);

//   return (
//     <div className='chatPageContainer'  style={{ maxHeight: "400px", position: "relative" }}>
//       <div className='followingBox' style={{ width: "77%", marginLeft: "4rem", marginTop: "1rem", height: "3rem" }}>
//         <div className='imageONbox' style={{ height: "3rem" }}>
//           <Image alt="Profile" className="followingImage" roundedCircle />
//         </div>
//         <div className='nameOfFollowingUser' style={{ height: "3rem" }}>
//           ansar
//         </div>
//         <div className='unfollowBtn' style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginLeft: "1rem", paddingRight: "1rem", height: "2.5rem" }}>
//           <Button variant="danger" className="unfollow-button" style={{ backgroundColor: "#7EAA92", border: "none", width: "6rem", marginLeft: "2.6rem", marginBottom: "0.8rem", fontSize: "0.7rem" }}>Profile</Button>
//         </div>
//       </div>

//       <div className="chatContent" ref={chatContentRef}   style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
//         {messages.map((msg) => (
//           <div key={msg._id} className={msg.sender === userInfo._id ? 'chatBYme' : 'chatBYother'}>
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

//       <div className="inputContainer" style={{ position: "sticky", bottom: 0, backgroundColor: "rgb(5, 80, 73)", padding: "1rem", display: "flex", alignItems: "center" }}>
//         <input
//           style={{ boxShadow: "0px 0px 0px 0 #352a2a", marginRight: "1rem" }}
//           type="text"
//           placeholder="Enter your message"
//           className="blog-input-field"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
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

const ENDPOINT = 'http://localhost:4000';
var socket , selectedChatCompare;

const ChatComponent = ({ chatRoomId }) => {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const chatContentRef = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [selectedChat, setSelectedChat] = useState();
  const navigate = useNavigate()

  useEffect(()=>{
    socket = io(ENDPOINT)
    socket.emit("setup",userInfo)
    socket.on("connection",()=>setSocketConnected(true))
 },[])
 



useEffect(() => {
  fetchMessages();
}, [chatRoomId]);


// useEffect(() => {//WORKED REAL TIME
//   socket.on('message received', (newMessageRecived) => {
//     console.log("Received new message IN FREND:", newMessageRecived);
//     if (!chatRoomId || chatRoomId !== newMessageRecived.room._id) {
//       // Add notification logic here if needed
//     } else {
//       setMessages((prevMessages) => [...prevMessages, newMessageRecived]);
//     }
//   });
// }, [chatRoomId]);

useEffect(() => {
  socket.on('message received', (newMessageRecived) => {
    // console.log("Received new message IN FREND:", newMessageRecived);
    if (newMessageRecived.sender._id !== userInfo._id) {
      if (!chatRoomId || chatRoomId !== newMessageRecived.room._id) {
        // Add notification logic here if needed
      } else {
        setMessages([...messages, newMessageRecived]);
      }
    }
  });
});





  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/users/chatMessages/${chatRoomId}`,
        {
          withCredentials: true,
        }
      );

      setMessages(response.data.messages);
      socket.emit('join chat', chatRoomId);

      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };



  


  const handleSendMessage = async () => {
    if (message.trim() === '') return;

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

      <div className="inputContainer" style={{ position: "sticky", bottom: 0, backgroundColor: "rgb(5, 80, 73)", padding: "1rem", display: "flex", alignItems: "center" }}>
        <input
          style={{ boxShadow: "0px 0px 0px 0 #352a2a", marginRight: "1rem" }}
          type="text"
          placeholder="Enter your message"
          className="blog-input-field"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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