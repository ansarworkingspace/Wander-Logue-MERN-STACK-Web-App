import { Container, Row, Col } from 'react-bootstrap';
import '../css/Form.css';
import { useLocation } from 'react-router-dom';


const FormContainer = ({ children }) => {
  const location = useLocation();
  const isRegister = location.pathname === '/register';

  const containerClass = isRegister ? 'custom-style-register' : 'custom-margin-top';
 
 
  return (
    
    <Container >
 {/* <div style={{ marginTop:"4rem"}}><h2 style={{ fontFamily: 'Londrina Solid', textAlign: 'center' ,fontSize:"2rem",color:"white"}}>WANDER-LOGUE</h2></div> */}
      <Row className='justify-content-md-center mt-5' >

      <Col xs={12} md={5} className={`card p-5 formParent ${containerClass}`}  >
     
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;