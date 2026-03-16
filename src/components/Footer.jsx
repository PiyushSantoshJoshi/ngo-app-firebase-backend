import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { newsletterAPI } from '../api/community';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribeStatus(null);
    try {
      await newsletterAPI.subscribe(email);
      setSubscribeStatus('success');
      setEmail('');
    } catch (err) {
      setSubscribeStatus(err.response?.data?.error || 'Subscription failed');
    }
  };

  return (
    <footer className="app-footer">
      <Container>
        <Row>
          <Col lg={4} className="mb-4">
            <h5 className="d-flex align-items-center gap-2">
              <i className="bi bi-heart-pulse-fill footer-brand-icon" /> NGO Community
            </h5>
            <p className="text-muted small mb-3">
              Connecting NGOs with communities and resources for a better world.
              Our platform facilitates collaboration between organizations, volunteers, and donors.
            </p>
            <div className="d-flex gap-3">
              <a href="#" aria-label="Facebook"><i className="bi bi-facebook fs-5" /></a>
              <a href="#" aria-label="Twitter"><i className="bi bi-twitter-x fs-5" /></a>
              <a href="#" aria-label="Instagram"><i className="bi bi-instagram fs-5" /></a>
              <a href="#" aria-label="LinkedIn"><i className="bi bi-linkedin fs-5" /></a>
            </div>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/search">Search NGOs</Link></li>
              <li><Link to="/requirements">Requirements</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/events">Events</Link></li>
            </ul>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <h5>Newsletter</h5>
            <p className="text-muted small mb-2">Get updates on new NGOs and opportunities.</p>
            {subscribeStatus === 'success' && <Alert variant="success" className="small py-2">Thank you for subscribing!</Alert>}
            {subscribeStatus && subscribeStatus !== 'success' && <Alert variant="danger" className="small py-2">{subscribeStatus}</Alert>}
            <Form onSubmit={handleSubscribe}>
              <Form.Group className="mb-2">
                <Form.Control
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-dark border-secondary text-white"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 rounded">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col md={6} className="text-center text-md-start small text-muted">
            © {new Date().getFullYear()} NGO Community. All rights reserved.
          </Col>
          <Col md={6} className="text-center text-md-end small text-muted">
            Made with <i className="bi bi-heart-fill text-danger" /> for a better world
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;