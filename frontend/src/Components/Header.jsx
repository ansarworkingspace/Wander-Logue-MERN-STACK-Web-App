

// import React from 'react';
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Navbar, Nav, Container, NavDropdown, Image, Button } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import { Link } from 'react-router-dom';
// import { FaPlus, FaGoogle,FaHome ,FaComment, FaUser } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';
// import { setCredentials } from '../slices/AuthSlice';
// import { useNavigate } from 'react-router-dom';
// import { useLogoutMutation } from '../slices/UserApiSlice';
// import { logout } from '../slices/AuthSlice';
// import { useCookies } from 'react-cookie'; // Import the hook
// import '../css/header.css';
// import { toast } from 'react-toastify';

// const Header = () => {
//   const { userInfo } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const isLandingRoute = location.pathname === '/landing';

 
  

//   return (
//     <header>
//       <Navbar style={{ backgroundColor: '#055049' }} variant='dark' expand='lg' collapseOnSelect className='custom-navbar'>
//         <Container>
//           <LinkContainer to='/'>
//             <Navbar.Brand className='navbar-brand-custom'>WANDER<span style={{color:"#e8f32b"}}>LOGUE</span></Navbar.Brand>
//           </LinkContainer>
//           <Navbar.Toggle aria-controls='basic-navbar-nav' />
//           <Navbar.Collapse id='basic-navbar-nav'>
//             <Nav className='ms-auto'>
//               {userInfo ? (
//                 <>
//                   <div className="dp-container">
//                   <Nav className='ms-auto'>

                    

//                   {userInfo && (
        
//         <div className="home-icon" onClick={() => navigate('/')}>
//           <Nav.Link style={{color:"white"}}>
//             <FaHome />
//           </Nav.Link>
//         </div>
//       )}



// {userInfo && (
//       <div className="home-icon" onClick={() => navigate('/ChatRoom')}>
//         <Nav.Link  style={{color:"white"}}>
//           <FaComment />
//         </Nav.Link>
//       </div>
//     )}

//     {userInfo && (
//       <div className="home-icon" onClick={() => navigate('/allFollowing')}>
//         <Nav.Link   style={{color:"white"}}>
//           <FaUser />
//         </Nav.Link>
//       </div>
//     )}




//       {userInfo && (
        
//         <div className="plus-icon" onClick={() => navigate('/create')}>
//           <Nav.Link style={{color:"white"}}>
//             <FaPlus />
//           </Nav.Link>
//         </div>
//       )}
//     </Nav>
                



// {userInfo.profileImage ? (
//     <Image src={`http://localhost:4000/api/users/uploads/${userInfo.profileImage}`} alt="Display Picture" className="dp-image rounded-circle" />
//   ) : userInfo.profileGoogleImage ? (
//     <Image src={userInfo.profileGoogleImage} alt="Google Display Picture" className="dp-image rounded-circle" />
//   ) : (
//     <div className="dp-initials">{userInfo.name ? userInfo.name.charAt(0).toUpperCase() : ''}</div>
//   )}

//                   </div>
//                   <LinkContainer style={{ fontFamily: "Sora", fontSize: "0.9rem",marginLeft:"0.2rem",marginTop:"0.2rem",color:"rgb(255 255 255)" }} to='/profile'>
//   <Nav.Link >
//     Profile
//   </Nav.Link>
// </LinkContainer>


//                 </>
//               ) : (

//                 <>
//                   {isLandingRoute ? (
//                     <LinkContainer style={{ fontFamily: "Sora", fontSize: "0.8rem" }} to='/login'>
//                       <Nav.Link>
//                         <FaUser /> Sign In
//                       </Nav.Link>
//                     </LinkContainer>
//                   ) : (
//                     <>
                    
                         

                     

//                     </>
//                   )}
//                 </>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default Header;




//testing real time notification
import React from 'react';
import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Image, Button ,Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { FaPlus, FaGoogle,FaHome ,FaComment, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/UserApiSlice';
import { logout } from '../slices/AuthSlice';
import { useCookies } from 'react-cookie'; // Import the hook
import '../css/header.css';
import { toast } from 'react-toastify';

import io from 'socket.io-client';
import axios from 'axios';


const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isLandingRoute = location.pathname === '/landing';

  const [hasUnreadMessages, setHasUnreadMessages] = useState(false); // State for unread messages
  const socket = io('http://localhost:4000'); 
  const [currentChatRoomId, setCurrentChatRoomId] = useState(null); // Define currentChatRoomId
  const [socketConnected, setSocketConnected] = useState(false);

  



//fetch notification status 
// useEffect(() => {
//   // Make an API request to get the chat room's notification status
//   const fetchNotificationStatus = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/users/checkHeadingNotification', {
//         withCredentials: true,
//       });

//       const hasUnreadedMessage = response.data; // Assuming the response is a boolean value
    
//       setHasUnreadMessages(hasUnreadedMessag);
//       console.log("Updated hasUnreadMessages:", hasUnreadedMessage);
//     } catch (error) {
//       // Handle errors
//     }
//   };

//   // Call the function when the ChatRoom component is loaded
//   fetchNotificationStatus();
// }, []);




//fetch notification status 
useEffect(() => {
  if (userInfo) {
  // Make an API request to get the chat room's notification status
  const fetchNotificationStatus = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users/checkHeadingNotification', {
        withCredentials: true,
      });

      const hasUnreadedMessage = response.data; // Assuming the response is a boolean value
    
      setHasUnreadMessages(hasUnreadedMessage);
      console.log("Updated hasUnreadMessages:", hasUnreadedMessage);
    } catch (error) {
      // Handle errors
    }
  };

  // Call the function when the ChatRoom component is loaded
  fetchNotificationStatus();
}
}, [userInfo]);







  useEffect(()=>{
    if (userInfo) {
    socket.emit("setup",userInfo)
    socket.on("connected",()=>setSocketConnected(true))
    }
 },[userInfo])
 



  useEffect(() => {
    if (userInfo) {
    // Listen for message events and update hasUnreadMessages
    socket.on('message received', (newMessageReceived) => {
      if (newMessageReceived.sender._id !== userInfo._id) {
        setHasUnreadMessages(true);
        
      }
    });
    
    // Listen for new message notification events and update hasUnreadMessages
    socket.on('new message notification', (newMessageReceived) => {
      if (
        currentChatRoomId !== newMessageReceived.room._id &&
        newMessageReceived.sender._id !== userInfo._id
      ) {
        setHasUnreadMessages(true);
        const senderId = newMessageReceived.sender._id;
        updateNotificationStatus(newMessageReceived.room._id,senderId);
      }
      
    });




  // Function to update the notification status
  const updateNotificationStatus = async (roomId,senderId) => {
    
    try {
      // Make an API request to update the notification status of the chat room
      await axios.post(`http://localhost:4000/api/users/updateNotificationStatus/${roomId}`, {
        userId: userInfo._id, // Include the user's ID in the request body
        senderId: senderId,
     
      });
    } catch (error) {
      // Handle errors
    }
  };


    }
  }, [userInfo]);




  // const handleCommentIconClick = async () => {
  //   // Remove the badge when the comment icon is clicked
  //   setHasUnreadMessages(false);

  //   await axios.post(`http://localhost:4000/api/users/${userInfo._id}`)

  //   // Navigate to the ChatRoom
  //   navigate('/ChatRoom');
  // };

  const handleCommentIconClick = async () => {
    try {
      // Remove the badge when the comment icon is clicked
      setHasUnreadMessages(false);
  
      // Make an API request to remove notifications for the user's chat rooms
      await axios.post(`http://localhost:4000/api/users/removeNotifications/${userInfo._id}`);
  
      // Navigate to the ChatRoom
      navigate('/ChatRoom');
    } catch (error) {
      // Handle errors
      console.error('Error removing notifications:', error);
      // You can add additional error handling logic here if needed
    }
  };
  



  return (
    <header>
      <Navbar style={{ backgroundColor: '#055049' }} variant='dark' expand='lg' collapseOnSelect className='custom-navbar'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='navbar-brand-custom'>WANDER<span style={{color:"#e8f32b"}}>LOGUE</span></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <div className="dp-container">
                  <Nav className='ms-auto'>

                    

                  {userInfo && (
        
        <div className="home-icon" onClick={() => navigate('/')}>
          <Nav.Link style={{color:"white"}}>
            <FaHome />
          </Nav.Link>
        </div>
      )}



{userInfo && (
      <div className="home-icon"  onClick={handleCommentIconClick}>
        <Nav.Link  style={{color:"white"}}>
        {/* <FaComment /> */}
        {/* {hasUnreadMessages && <h5>new messages</h5>} */}
        
                            <FaComment />
                            {hasUnreadMessages && (
                              <Badge pill bg='danger' className='badge-above'>
                                New
                              </Badge>
                            )}
                          

        </Nav.Link>
      </div>
    )}

    {userInfo && (
      <div className="home-icon" onClick={() => navigate('/allFollowing')}>
        <Nav.Link   style={{color:"white"}}>
          <FaUser />
        </Nav.Link>
      </div>
    )}




      {userInfo && (
        
        <div className="plus-icon" onClick={() => navigate('/create')}>
          <Nav.Link style={{color:"white"}}>
            <FaPlus />
          </Nav.Link>
        </div>
      )}
    </Nav>
                



{userInfo.profileImage ? (
    <Image src={`http://localhost:4000/api/users/uploads/${userInfo.profileImage}`} alt="Display Picture" className="dp-image rounded-circle" />
  ) : userInfo.profileGoogleImage ? (
    <Image src={userInfo.profileGoogleImage} alt="Google Display Picture" className="dp-image rounded-circle" />
  ) : (
    <div className="dp-initials">{userInfo.name ? userInfo.name.charAt(0).toUpperCase() : ''}</div>
  )}

                  </div>
                  <LinkContainer style={{ fontFamily: "Sora", fontSize: "0.9rem",marginLeft:"0.2rem",marginTop:"0.2rem",color:"rgb(255 255 255)" }} to='/profile'>
  <Nav.Link >
    Profile
  </Nav.Link>
</LinkContainer>


                </>
              ) : (

                <>
                  {isLandingRoute ? (
                    <LinkContainer style={{ fontFamily: "Sora", fontSize: "0.8rem" }} to='/login'>
                      <Nav.Link>
                        <FaUser /> Sign In
                      </Nav.Link>
                    </LinkContainer>
                  ) : (
                    <>
                    
                         

                     

                    </>
                  )}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;



