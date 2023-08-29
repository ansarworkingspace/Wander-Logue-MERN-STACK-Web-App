// import React from 'react';
// import { Image, Button } from 'react-bootstrap'; // Assuming you are using Bootstrap components
// import '../css/chatRoom.css'
// import '../css/viewBlog.css'
// import '../css/profileScree.css'; // Import the CSS file
// import axios from 'axios'; // Import Axios for making API requests


// const ChatComponent = () => {

//   const [message, setMessage] = useState('');


//   return (
//     <div className='chatPageContainer' style={{ maxHeight: "400px", position: "relative" }}>
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

//       <div className="chatContent" style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
//         {/* Your chat content goes here */}
//         <div className='chatBYother'>
//           <div className='userName' style={{ paddingTop: "0.4rem" }}>
//             <h4 className='commentH4' >Ansar</h4>
//           </div>
//           <div className='commentText'>
//             <h3 className='commentH3'>hello man</h3>
//           </div>
//           <div className='commentTime' style={{ paddingBottom: "0.1rem" }}>
//             <h5 className='commentH5'>4.20pm</h5>
//           </div>
//         </div>
//         <div className='chatBYme'>
//           <div className='userName' style={{ paddingTop: "0.4rem" }}>
//             <h4 className='commentH4' >Me</h4>
//           </div>
//           <div className='commentText'>
//             <h3 className='commentH3'>hi bro</h3>
//           </div>
//           <div className='commentTime' style={{ paddingBottom: "0.1rem" }}>
//             <h5 className='commentH5'>4.20pm</h5>
//           </div>
//         </div>
//       </div>

//       <div className="inputContainer" style={{ position: "sticky", bottom: 0, backgroundColor: "rgb(5, 80, 73)", padding: "1rem", display: "flex", alignItems: "center" }}>
//         <input
//           style={{ boxShadow: "0px 0px 0px 0 #352a2a", marginRight: "1rem" }}
//           type="text"
//           placeholder="Enter your message"
//           className="blog-input-field"
//         />
//         <Button variant="danger" className="unfollow-button" style={{ backgroundColor: "#7EAA92", border: "none", width: "6rem" }}>SEND</Button>
//       </div>
//     </div>
//   );
// }

// export default ChatComponent;


import React, { useState,useEffect }  from 'react';
import { Image, Button } from 'react-bootstrap'; // Assuming you are using Bootstrap components
import '../css/chatRoom.css'
import '../css/viewBlog.css'
import '../css/profileScree.css'; // Import the CSS file
import axios from 'axios'; // Import Axios for making API requests
import { useSelector } from 'react-redux';

const ChatComponent = ({ chatRoomId }) => {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);







  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/chatMessages/${chatRoomId}`, {
          withCredentials: true,
        });

        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    }

    fetchMessages();
  }, [chatRoomId]);








  const handleSendMessage = async () => {
    if (message.trim() === '') return; // Don't send empty messages

    try {
      await axios.post(
        `http://localhost:4000/api/users/chatSend/${chatRoomId}`,
        {
          content: message
        },
        {
          withCredentials: true // Include cookies in the request
        }
      );
      // Clear the input after sending the message
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };




  return (
    <div className='chatPageContainer' style={{ maxHeight: "400px", position: "relative" }}>
      <div className='followingBox' style={{ width: "77%", marginLeft: "4rem", marginTop: "1rem", height: "3rem" }}>
        <div className='imageONbox' style={{ height: "3rem" }}>
          <Image alt="Profile" className="followingImage" roundedCircle />
        </div>
        <div className='nameOfFollowingUser' style={{ height: "3rem" }}>
          ansar
        </div>
        <div className='unfollowBtn' style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginLeft: "1rem", paddingRight: "1rem", height: "2.5rem" }}>
          <Button variant="danger" className="unfollow-button" style={{ backgroundColor: "#7EAA92", border: "none", width: "6rem", marginLeft: "2.6rem", marginBottom: "0.8rem", fontSize: "0.7rem" }}>Profile</Button>
        </div>
      </div>

      <div className="chatContent" style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
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
