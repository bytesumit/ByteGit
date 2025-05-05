import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">&copy; {new Date().getFullYear()} byteGit, Inc.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a href="#" className="text-light mx-2 text-decoration-none">
              Terms
            </a>
            <a href="#" className="text-light mx-2 text-decoration-none">
              Privacy
            </a>
            <a href="#" className="text-light mx-2 text-decoration-none">
              Security
            </a>
            <a href="#" className="text-light mx-2 text-decoration-none">
              Status
            </a>
            <a href="#" className="text-light mx-2 text-decoration-none">
              Help
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
