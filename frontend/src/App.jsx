import { Container } from 'react-bootstrap';
import { Outlet,Route, useLocation  } from 'react-router-dom';
import Header from './Components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const location = useLocation();
  // Check if the current route is /login or /register
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <>
       {(!isLoginPage && !isRegisterPage) && <Header />}
      <ToastContainer />
      <Container className='my-2'>
        <Outlet />
      </Container>
    </>
  );
};

export default App;
