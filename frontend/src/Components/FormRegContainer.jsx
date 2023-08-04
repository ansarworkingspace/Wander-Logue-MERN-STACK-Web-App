

import { Container, Row, Col } from 'react-bootstrap';
import '../css/Form.css';
import { useLocation } from 'react-router-dom';

const FormRegContainer = ({ children }) => {
  return (
    <Container>
      {/* <div style={{ marginTop: "4rem", marginBottom: "1rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: 'Londrina Solid', fontSize: "2rem", color: "white" }}>WANDER-LOGUE</h2>
      </div> */}
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="card p-4 formParent custom-style-register">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormRegContainer;
