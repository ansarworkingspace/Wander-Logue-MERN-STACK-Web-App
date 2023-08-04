import { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Form,Container,Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../Components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/UserApiSlice';
import { setCredentials } from '../slices/AuthSlice';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';



const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);



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

  return (

   
    <FormContainer >

      <h1 style={{ fontFamily: 'Londrina Solid', textAlign: 'center' ,fontSize:"2rem",color:"white"}} className=' mx-auto'>Sign In</h1>

      <Form onSubmit={submitHandler} 
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

        <Form.Group className='my-2 parentOfInput '  controlId='password'>
       
          <Form.Control  className='custom-input'
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type='submit'
          variant='primary'
          className='mt-3'
          style={{
            width: '37%',
            margin:"0",
            height:"3rem",
            marginTop:"1rem",
            backgroundColor:"#27BE19",
            borderRadius:"1rem",
            border:"none"
          }}
        >
          Sign In
        </Button>
        <div style={{color:"white", fontFamily: 'Londrina Solid'}}> New User? <Link style={{ fontFamily: 'Londrina Solid',color:"#20B0B9"}} to='/register'>Register</Link></div>
      </Form>

      {isLoading && <Loader />}


    </FormContainer>
    
  );
};

export default LoginScreen;