import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Footer() {
  return (
    <div className="bg-dark text-white pt-4">
      <Container fluid className="content-padding">
        <Row className="gy-4">

          <Col md={6} lg={3}>
            <div className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-blog fs-1 me-2"></i>
              <h5 className="mb-0 fw-bold">Blogs<span className="text-info">Post</span></h5>
            </div>
            <p className="small">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              praesentium necessitatibus quasi consequatur nobis.
            </p>
          </Col>

          <Col md={6} lg={3}>
            <h6 className="fw-semibold">Links</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none d-block py-1 hover-text-info">Home Page</a></li>
              <li><a href="#" className="text-white text-decoration-none d-block py-1 hover-text-info">About</a></li>
              <li><a href="#" className="text-white text-decoration-none d-block py-1 hover-text-info">Landing Page</a></li>
            </ul>
          </Col>

          <Col md={6} lg={3}>
            <h6 className="fw-semibold">Assistance</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none d-block py-1 hover-text-info">React</a></li>
              <li><a href="#" className="text-white text-decoration-none d-block py-1 hover-text-info">Fontawsome</a></li>
              <li><a href="#" className="text-white text-decoration-none d-block py-1 hover-text-info">Font Awesome</a></li>
            </ul>
          </Col>

          <Col md={6} lg={3}>
            <h6 className="fw-semibold">Contact Us</h6>
            <Form className="d-flex mb-3">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className="me-2"
              />
              <Button variant="info">Subscribe</Button>
            </Form>

            <div className="d-flex gap-3">
              <i className="fa-brands fa-facebook fs-5 text-white hover-text-info"></i>
              <i className="fa-brands fa-twitter fs-5 text-white hover-text-info"></i>
              <i className="fa-brands fa-whatsapp fs-5 text-white hover-text-info"></i>
              <i className="fa-brands fa-instagram fs-5 text-white hover-text-info"></i>
              <i className="fa-brands fa-youtube fs-5 text-white hover-text-info"></i>
            </div>
          </Col>
        </Row>

        <div className="text-center mt-4 pb-3 small">
          <p className="mb-0">&copy; 2023 Flatio-s @ Pvt Ltd</p>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
