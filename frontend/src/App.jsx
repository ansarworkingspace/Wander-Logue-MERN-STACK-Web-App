import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from "./Components/AdminHeader";

const App = () => {

  const location = useLocation()
  const isAdminPage = location.pathname.startsWith("/admin"); 

  return (
    <>
       {isAdminPage ? <AdminHeader /> : <Header/>}
      <ToastContainer />
      <Container className='my-2'>
        <Outlet />
      </Container>
    </>
  );
};

export default App;
