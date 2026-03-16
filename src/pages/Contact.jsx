import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { contactAPI } from '../api/community';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General enquiry', message: '' });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({});
    setLoading(true);
    try {
      await contactAPI.submit(formData);
      setStatus({ type: 'success', message: 'Thank you! We will get back to you soon.' });
      setFormData({ name: '', email: '', subject: 'General enquiry', message: '' });
    } catch (err) {
      setStatus({ type: 'danger', message: err.response?.data?.error || 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 my-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle mb-4">Have a question or feedback? We’d love to hear from you.</p>
          <Card className="auth-card">
            <Card.Body>
              {status.message && (
                <Alert variant={status.type} dismissible onClose={() => setStatus({})}>
                  {status.message}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name *</Form.Label>
                      <Form.Control name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Select name="subject" value={formData.subject} onChange={handleChange}>
                    <option value="General enquiry">General enquiry</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Technical support">Technical support</option>
                    <option value="Feedback">Feedback</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Message *</Form.Label>
                  <Form.Control as="textarea" rows={4} name="message" value={formData.message} onChange={handleChange} required placeholder="Your message..." />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
