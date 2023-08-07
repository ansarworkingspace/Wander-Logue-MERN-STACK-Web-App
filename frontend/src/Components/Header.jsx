
// import React from 'react';
// import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import { FaPlus, FaGoogle } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useLogoutMutation } from '../slices/UserApiSlice';
// import { logout } from '../slices/AuthSlice';
// import '../css/header.css';

// const Header = () => {
//   const { userInfo } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [logoutApiCall] = useLogoutMutation();

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       navigate('/login');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <header>
//       <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect className='custom-navbar'>
//         <Container>
//           <LinkContainer to='/'>
//             <Navbar.Brand className='navbar-brand-custom'>WANDER-LOGUE</Navbar.Brand>
//           </LinkContainer>
//           <Navbar.Toggle aria-controls='basic-navbar-nav' />
//           <Navbar.Collapse id='basic-navbar-nav'>
//             <Nav className='ms-auto'>
//               {userInfo ? (
//                 <>
//                   <Nav.Link>
//                     <FaPlus />
//                   </Nav.Link>
//                   <div className="dp-container">
//                     {userInfo.profileImage ? (
//                       <Image src={`http://localhost:4000/api/users/uploads/${userInfo.profileImage}`} alt="Display Picture" className="dp-image rounded-circle" />
//                     ) : (
//                       <div className="dp-initials">{userInfo.name ? userInfo.name.charAt(0).toUpperCase() : ''}</div>
//                     )}
//                   </div>
//                   <NavDropdown title={userInfo.name} id='username'>
//                     <LinkContainer to='/profile'>
//                       <NavDropdown.Item>Profile</NavDropdown.Item>
//                     </LinkContainer>
//                     <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
//                   </NavDropdown>
//                 </>
//               ) : (
//                 <>
//                   <LinkContainer to='/login'>
//                     <Nav.Link>
//                       <FaGoogle /> Sign In
//                     </Nav.Link>
//                   </LinkContainer>
//                   <LinkContainer to='/register'>
//                     <Nav.Link>
//                       <FaGoogle /> Sign Up
//                     </Nav.Link>
//                   </LinkContainer>
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


// import React from 'react';
// import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import { FaPlus, FaGoogle } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useLogoutMutation } from '../slices/UserApiSlice';
// import { logout } from '../slices/AuthSlice';
// import '../css/header.css';

// const Header = () => {
//   const { userInfo } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [logoutApiCall] = useLogoutMutation();

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       navigate('/login');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <header>
//       <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect className='custom-navbar'>
//         <Container>
//           <LinkContainer to='/'>
//             <Navbar.Brand className='navbar-brand-custom'>WANDER-LOGUE</Navbar.Brand>
//           </LinkContainer>
//           <Navbar.Toggle aria-controls='basic-navbar-nav' />
//           <Navbar.Collapse id='basic-navbar-nav'>
//             <Nav className='ms-auto'>
//               {userInfo ? (
//                 <>
//                   <Nav.Link>
//                     <FaPlus />
//                   </Nav.Link>
//                   <div className="dp-container">
//                     {userInfo.profileImage ? (
//                       <Image src={`http://localhost:4000/api/users/uploads/${userInfo.profileImage}`} alt="Display Picture" className="dp-image rounded-circle" />
//                     ) : (
//                       <div className="dp-initials">{userInfo.name ? userInfo.name.charAt(0).toUpperCase() : ''}</div>
//                     )}
//                   </div>
//                   <NavDropdown title="Profile" id='username'>
//                     <LinkContainer to='/profile'>
//                       <NavDropdown.Item>Profile</NavDropdown.Item>
//                     </LinkContainer>
//                     <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
//                   </NavDropdown>
//                 </>
//               ) : (
//                 <>
//                   <LinkContainer to='/login'>
//                     <Nav.Link>
//                       <FaGoogle /> Sign In
//                     </Nav.Link>
//                   </LinkContainer>
//                   <LinkContainer to='/register'>
//                     <Nav.Link>
//                       <FaGoogle /> Sign Up
//                     </Nav.Link>
//                   </LinkContainer>
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
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaPlus, FaGoogle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/UserApiSlice';
import { logout } from '../slices/AuthSlice';
import '../css/header.css';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect className='custom-navbar'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='navbar-brand-custom'>WANDER-LOGUE</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <div className="dp-container">
                    <div className="plus-icon">
                      <Nav.Link>
                        <FaPlus />
                      </Nav.Link>
                    </div>
                    {userInfo.profileImage ? (
                      <Image src={`http://localhost:4000/api/users/uploads/${userInfo.profileImage}`} alt="Display Picture" className="dp-image rounded-circle" />
                    ) : (
                      <div className="dp-initials">{userInfo.name ? userInfo.name.charAt(0).toUpperCase() : ''}</div>
                    )}
                  </div>
                  <NavDropdown title="Profile" id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaGoogle /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaGoogle /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
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

