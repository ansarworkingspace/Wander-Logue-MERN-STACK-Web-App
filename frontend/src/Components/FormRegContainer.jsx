

import { Container, Row, Col } from 'react-bootstrap';
import '../css/Form.css';
import { useLocation } from 'react-router-dom';

const FormRegContainer = ({ children }) => {
  return (
    <Container>
      <div style={{  marginBottom: "1rem", textAlign: "center" }}>
      </div>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="card p-4 formParent-reg custom-style-register">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormRegContainer;
