


import { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Form,Container,Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../Components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation ,useGoogleLoginMutation} from '../slices/UserApiSlice';
import { setCredentials } from '../slices/AuthSlice';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {GoogleLogin,googleLogout} from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import axios from 'axios';




const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false); 




  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
      
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };








 


 const [googleLogin] = useGoogleLoginMutation();


 const handleGoogleSignInSuccess = async (response) => {
  const decoded = jwt_decode(response.credential); // Decode the Google response
  const { sub, name, email, picture } = decoded;

  try {
    const googleLoginData = {
      user_id: sub,
      name: name,
      email: email,
      profileGoogleImage: picture,
    };

    // Use the useGoogleLoginMutation to perform the Google login
    const res = await googleLogin(googleLoginData).unwrap();
    console.log(res);
    // Dispatch the user credentials to update authentication status
    dispatch(setCredentials({ ...res }));

    // Redirect to the desired route
    navigate('/');
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    // Handle the error, show a toast, etc.
  }
};







  return (

    <FormContainer >

      <h1 style={{ fontFamily: 'Phudu', textAlign: 'center' ,fontSize:"1.6rem",color:"rgb(5, 80, 73)"}} className=' mx-auto'>Sign In</h1>

      <Form onSubmit={submitHandler} 
      style={{ display:"flex",flexDirection:"column",gap:"0.45rem",alignItems:"center"}}
      
      >
        <Form.Group className='my-2 parentOfInput' controlId='email'>
    
          <Form.Control  className='custom-input'
            type='email'
            placeholder='Enter email'
            value={email}
            style={{color:"black"}}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2 parentOfInput '  controlId='password'>
       
        <Form.Control className='custom-input'
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>


<span
    className='password-toggle-icon'
    onClick={togglePasswordVisibility}
  >
    {showPassword ? (
    <FaEyeSlash /> 
  ) : (
    <FaEye /> 
  )}
  </span>



        </Form.Group>

        <Button
          disabled={isLoading}
          type='submit'
          variant='primary'
          className='mt-3 custom-button custom-margin-top'
          
        >
          Sign In
        </Button>

      </Form>

     
<div className='googleAuth' style={{marginTop:"4rem",marginLeft:"-2.4rem"}}>
<GoogleLogin
                      onSuccess={handleGoogleSignInSuccess}
                      onError={()=>console.log("error")}
                      />

</div>


      <div style={{color:"rgb(5, 80, 73)",letterSpacing:"1.1px",marginLeft:"-2.8rem", fontFamily: 'Phudu', marginTop:"2rem",fontSize:"0.8rem",width:"23rem"}}> Ready to Join? <Link style={{ fontFamily: 'Squada One',color:"#20B0B9"}} to='/register'>Register  </Link>now and Unlock Your Access!</div>
     
      {isLoading && <Loader />}

      
    </FormContainer>
 
  );
};

export default LoginScreen;




