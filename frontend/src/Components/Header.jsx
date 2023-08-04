import { useEffect,useState } from 'react';
import { Navbar, Nav, Container,NavDropdown, Badge  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaSignInAlt, FaSignOutAlt,FaGoogle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/UserApiSlice';
import { logout } from '../slices/AuthSlice';




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



  // useEffect to check if userInfo is present in localStorage, otherwise redirect to login
  // useEffect(() => {
  //   const jwtToken = document.cookie
  //     .split('; ')
  //     .find((row) => row.startsWith('jwt='))
  //     ?.split('=')[1];

  //   if (!jwtToken) {
  //     // If jwtToken is not found, clear userInfo from localStorage and redirect to login
  //     localStorage.removeItem('userInfo');
  //     navigate('/login');
  //   }
  // }, [navigate]);
  
  

  return (
    <header>
     
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect className='custom-navbar'>
        <Container>
          <LinkContainer to='/'>
       

            <Navbar.Brand  className='navbar-brand-custom' style={{ fontFamily: 'Londrina Solid', fontSize:"2rem",color:"white"}}>WANDER-LOGUE</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
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