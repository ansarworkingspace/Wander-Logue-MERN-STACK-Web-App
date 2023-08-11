import { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Form,Container,Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../Components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useAdminLoginMutation} from '../adminSlice/AdminApiSlice';
import { setAdminCredentials } from '../adminSlice/AdminAuthSlice';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';



const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const { adminInfo } = useSelector((state) => state.adminAuth);



  useEffect(() => {
    if (adminInfo) {
      navigate('/admin/adminHome');
      
    }
  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLogin({ email, password }).unwrap();
      dispatch(setAdminCredentials({ ...res }));
      
      navigate('/admin/adminHome');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (

   
    <FormContainer >

      <h1 style={{ fontFamily: 'Teko ', textAlign: 'center' ,fontSize:"1.6rem",color:"white"}} className=' mx-auto'>Admin Sign In</h1>

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
          className='mt-3 custom-button'
          
        >
          Sign In
        </Button>
        {/* <div style={{color:"white",letterSpacing:"1.1px",marginLeft:"-1.8rem", fontFamily: 'Squada One', marginTop:"6rem",fontSize:"0.8rem",width:"23rem"}}> Ready to Join? <Link style={{ fontFamily: 'Squada One',color:"#20B0B9"}} to='/admin/register'>Register  </Link>now and Unlock Your Access!</div> */}
      
      </Form>

      {isLoading && <Loader />}


    </FormContainer>
    
  );
};

export default LoginScreen;