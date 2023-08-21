import { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Form,Container,Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../Components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useVerifyOTPMutation} from '../slices/UserApiSlice';
import { setCredentials } from '../slices/AuthSlice';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {GoogleLogin,googleLogout} from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import axios from 'axios';




const Otpverification = () => {
  const [email, setEmail] = useState('');
const [otp,setOtp] = useState('')

const navigate = useNavigate(); // Initialize the navigate function
const dispatch = useDispatch();

const [verifyOTP] = useVerifyOTPMutation();



const handleOtpSubmit = async (e) => {
  e.preventDefault();

  try {
    // Send OTP for verification
    const response = await verifyOTP({ email, otp }).unwrap(); // Send OTP verification request

      // Dispatch user information to Redux
      dispatch(setCredentials({ ...response }));

  

    navigate('/');

  } catch (error) {

    console.error('OTP verification failed:', error);
  }
};


  return (

    <FormContainer >

      <h1 style={{ fontFamily: 'Squada One', textAlign: 'center' ,fontSize:"1.6rem",color:"white"}} className=' mx-auto'>Otp Verification</h1>

      <Form onSubmit={handleOtpSubmit}
      style={{ display:"flex",flexDirection:"column",gap:"0.45rem",alignItems:"center"}}
      
      >
        <Form.Group className='my-2 parentOfInput' controlId='email'>
    
          <Form.Control  className='custom-input'
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2 parentOfInput '  controlId='otp'>
       
        <Form.Control className='custom-input'
            type='text'
            placeholder='Enter otp'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          ></Form.Control>

        </Form.Group>

        <Button
          
          type='submit'
          variant='primary'
          className='mt-3 custom-button custom-margin-top'
          
        >
          Submit 
        </Button>

      </Form>

      {/* <div style={{color:"white",letterSpacing:"1.1px",marginLeft:"-0.8rem", fontFamily: 'Squada One', marginTop:"2rem",fontSize:"0.8rem",width:"23rem"}}> Ready to Join? <Link style={{ fontFamily: 'Squada One',color:"#20B0B9"}} to='/register'>Register  </Link>now and Unlock Your Access!</div>
      */}
      

      
    </FormContainer>
 
  );
};

export default Otpverification;