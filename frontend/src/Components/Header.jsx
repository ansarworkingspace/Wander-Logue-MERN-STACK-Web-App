
// import React from 'react';
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import { Link } from 'react-router-dom';
// import { FaPlus, FaGoogle,FaHome ,FaComment, FaUser } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useLogoutMutation } from '../slices/UserApiSlice';
// import { logout } from '../slices/AuthSlice';
// import { useCookies } from 'react-cookie'; // Import the hook
// import '../css/header.css';
// import jwt_decode from "jwt-decode";



// const Header = () => {
//   const { userInfo } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [logoutApiCall] = useLogoutMutation();
//   const [cookies] = useCookies(['jwt']);
//   const location = useLocation();

//   const isLandingRoute = location.pathname === '/landing';



//   return (
//     <header>
//       <Navbar style={{ backgroundColor: '#181a1b' }} variant='dark' expand='lg' collapseOnSelect className='custom-navbar'>
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
//           <Nav.Link>
//             <FaHome />
//           </Nav.Link>
//         </div>
//       )}



// {userInfo && (
//       <div className="home-icon" onClick={() => navigate('/chat')}>
//         <Nav.Link>
//           <FaComment />
//         </Nav.Link>
//       </div>
//     )}

//     {userInfo && (
//       <div className="home-icon" onClick={() => navigate('/profile')}>
//         <Nav.Link>
//           <FaUser />
//         </Nav.Link>
//       </div>
//     )}




//       {userInfo && (
        
//         <div className="plus-icon" onClick={() => navigate('/create')}>
//           <Nav.Link>
//             <FaPlus />
//           </Nav.Link>
//         </div>
//       )}
//     </Nav>
//                     {userInfo.profileImage ? (
//                       <Image src={`http://localhost:4000/api/users/uploads/${userInfo.profileImage}`} alt="Display Picture" className="dp-image rounded-circle" />
//                     ) : (
//                       <div className="dp-initials">{userInfo.name ? userInfo.name.charAt(0).toUpperCase() : ''}</div>
//                     )}
//                   </div>
//                   <LinkContainer style={{ fontFamily: "Sora", fontSize: "0.9rem",marginLeft:"0.2rem",marginTop:"0.2rem",color:"#e6e1e1" }} to='/profile'>
//   <Nav.Link>
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
//                       <LinkContainer style={{ fontFamily: "Sora", fontSize: "0.8rem" }} to='/login'>
//                         <Nav.Link>
//                           <FaGoogle /> Sign In
//                         </Nav.Link>
//                       </LinkContainer>
//                       <LinkContainer style={{ fontFamily: "Sora", fontSize: "0.8rem" }} to='/register'>
//                         <Nav.Link>
//                           <FaGoogle /> Sign Up
//                         </Nav.Link>
//                       </LinkContainer>
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




import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Image, Button } from 'react-bootstrap';
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

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isLandingRoute = location.pathname === '/landing';

 
  

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
      <div className="home-icon" onClick={() => navigate('/chat')}>
        <Nav.Link  style={{color:"white"}}>
          <FaComment />
        </Nav.Link>
      </div>
    )}

    {userInfo && (
      <div className="home-icon" onClick={() => navigate('/profile')}>
        <Nav.Link  style={{color:"white"}}>
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
                    {/* {userInfo.profileImage ? (
                      <Image src={`http://localhost:4000/api/users/uploads/${userInfo.profileImage}`} alt="Display Picture" className="dp-image rounded-circle" />
                    ) : (
                      <div className="dp-initials">{userInfo.name ? userInfo.name.charAt(0).toUpperCase() : ''}</div>
                    )} */}



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



