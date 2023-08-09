

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormRegContainer from '../Components/FormRegContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/UserApiSlice';
import { setCredentials } from '../slices/AuthSlice';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password, mobile }).unwrap();
        dispatch(setCredentials({ ...res }));
        
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormRegContainer>
      <h1 style={{ fontFamily: 'Squada One', textAlign: 'center' ,fontSize:"1.6rem",color:"white"}}   className="mb-4">Register</h1>
      <Form onSubmit={submitHandler} style={{ display:"flex",flexDirection:"column",gap:"0.45rem",alignItems:"center"}}>
        
        <Row>
          <Col md={6}>
            <Form.Group controlId="name">
              {/* <Form.Label>Name</Form.Label> */}
              <Form.Control className='custom-regInput'
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
             
              <Form.Control   className='custom-regInput'
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="password">
             
              <Form.Control  className='custom-regInput'
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="confirmPassword">
            
              <Form.Control   className='custom-regInput'
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="mobile">
        
          <Form.Control   className='custom-regInput '
            type="mobile"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3 custom-button-reg" >
          Register
        </Button>
        {isLoading && <Loader />}
        </Form>
        <div style={{color:"white",letterSpacing:"1.1px",marginLeft:"6.2rem", fontFamily: 'Squada One', marginTop:"4rem",fontSize:"0.8rem",width:"23rem"}}> Ready to Join? <Link style={{ fontFamily: 'Squada One',color:"#20B0B9"}} to='/login'>Login </Link>now and Unlock Your Access!</div>
      
    </FormRegContainer>
  );
};

export default RegisterScreen;

