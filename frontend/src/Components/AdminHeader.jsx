
import { Navbar, Nav, Container,NavDropdown, Badge  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAdminLogoutMutation } from '../adminSlice/AdminApiSlice';
import { adminLogout } from '../adminSlice/AdminAuthSlice';
import { FaSignInAlt, FaSignOutAlt,FaGoogle } from 'react-icons/fa';



const Header = () => {
  const { adminInfo } = useSelector((state) => state.adminAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApi] = useAdminLogoutMutation();
  
  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(adminLogout());
      navigate('/admin/login');
    } catch (err) {
      console.error(err);
    }
  };


  
  

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
              {adminInfo ? (
                <>
                  <NavDropdown title={adminInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/admin/login'>
                    <Nav.Link>
                    <FaGoogle /> Sign In 
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/admin/register'>
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