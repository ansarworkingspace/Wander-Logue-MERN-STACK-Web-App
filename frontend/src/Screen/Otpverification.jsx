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
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60); // 2 minutes in seconds

const navigate = useNavigate(); // Initialize the navigate function
const dispatch = useDispatch();
const [verifyOTP] = useVerifyOTPMutation();



useEffect(() => {
  if (remainingTime > 0) {
    const timer = setTimeout(() => {
      setRemainingTime(remainingTime - 1);
    }, 1000); // Update every second
    return () => clearTimeout(timer);
  } else {
    setIsTimerExpired(true);
  }
}, [remainingTime]);




// const handleResendClick = async () => {
//   try {
// // Send a request to backend to resend OTP
// await axios.get('http://localhost:4000/api/users/resendOtp', {
//   withCredentials: true, 
// });

//     // Reset timer and enable submit button
//     setRemainingTime(20);
//     setIsTimerExpired(false);
//   } catch (error) {
//     console.error('Error while resending OTP:', error);
//   }
// };



const handleResendClick = async () => {
  try {
    // Send a request to backend to resend OTP
    const res = await axios.get('http://localhost:4000/api/users/resendOtp', {
      withCredentials: true,
    });

    if (res.status === 200) { // Check if the response status is 200 (success)
      // Reset timer and enable submit button
      setRemainingTime(60);
      setIsTimerExpired(false);
    } else {
      console.error('Error while resending OTP:', res.data.message);
    }
  } catch (error) {
    console.error('Error while resending OTP:', error);
  }
};





const handleOtpSubmit = async (e) => {
  e.preventDefault();

  try {
    // Send OTP for verification
    const response = await verifyOTP({ email, otp }).unwrap(); // Send OTP verification request

      // Dispatch user information to Redux
      dispatch(setCredentials({ ...response }));

  

    navigate('/');

  } catch (error) {

    // console.error('OTP verification failed:', error);
  // Display toast error message
  toast.error(error?.data?.message || error.message);

  }
};





const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (isTimerExpired) {
    await handleResendClick();
  } else {
    await handleOtpSubmit(e);
  }
};





  return (

    <FormContainer >

      <h1 style={{ fontFamily: 'phudu', textAlign: 'center' ,fontSize:"1.6rem",color:"rgb(5, 80, 73)"}} className=' mx-auto'>Otp Verification</h1>

      <Form onSubmit={handleFormSubmit}
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

        {/* <Button
          
          type='submit'
          variant='primary'
          className='mt-3 custom-button custom-margin-top'
          
        >
          Submit 
        </Button> */}


{isTimerExpired ? (
          <Button type='submit' variant='primary' className='mt-3 custom-button custom-margin-top'style={{paddingLeft:"16px"}}  >Resend</Button>
        ) : (
          <Button type='submit' variant='primary' className='mt-3 custom-button custom-margin-top' >Verify</Button>
        )}
 <div className='timer' style={{color:"rgb(5, 80, 73)", marginLeft: '1.7rem', marginTop: '0.5rem', fontFamily: 'Sora' }}>{Math.floor(remainingTime / 60)} min {remainingTime % 60} sec</div>


      


      </Form>

    

      
    </FormContainer>
 
  );
};

export default Otpverification;