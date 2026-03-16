import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { eventsAPI } from '../api/community';

const AddEvent = () => {
  const { user, isNgo } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    eventDate: '',
    eventTime: '',
    location: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Event title is required';
    if (!form.eventDate) e.eventDate = 'Date is required';
    if (!form.eventTime) e.eventTime = 'Time is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!validate() || !user?.email) return;
    const dateTime = `${form.eventDate}T${form.eventTime}:00`;
    setSubmitting(true);
    try {
      await eventsAPI.create({
        title: form.title.trim(),
        description: form.description.trim(),
        eventDate: dateTime,
        location: form.location.trim(),
        ngoEmail: user.email
      });
      setStatus('success');
      setForm({ title: '', description: '', eventDate: '', eventTime: '', location: '' });
      setTimeout(() => navigate('/events'), 1500);
    } catch (err) {
      setStatus(err.response?.data?.error || 'Failed to create event');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Container className="py-5 my-4">
        <Alert variant="info">Please <Link to="/login">log in</Link> to add an event.</Alert>
      </Container>
    );
  }

  if (!isNgo) {
    return (
      <Container className="py-5 my-4">
        <Alert variant="warning">Only registered NGOs can create events. <Link to="/ngo-register">Register your NGO</Link> or go back to <Link to="/events">Events</Link>.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5 my-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="page-title">Add event</h1>
              <p className="page-subtitle mb-0">Create a drive, fundraiser, or community event</p>
            </div>
            <Button as={Link} to="/events" variant="outline-secondary" size="sm">Back to events</Button>
          </div>

          <Card className="auth-card">
            <Card.Body>
              {status === 'success' && <Alert variant="success">Event created! Redirecting to events...</Alert>}
              {status && status !== 'success' && <Alert variant="danger">{status}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Event title *</Form.Label>
                  <Form.Control
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Blood donation drive, Fundraiser for education"
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date *</Form.Label>
                      <Form.Control
                        type="date"
                        name="eventDate"
                        value={form.eventDate}
                        onChange={handleChange}
                        isInvalid={!!errors.eventDate}
                      />
                      <Form.Control.Feedback type="invalid">{errors.eventDate}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Time *</Form.Label>
                      <Form.Control
                        type="time"
                        name="eventTime"
                        value={form.eventTime}
                        onChange={handleChange}
                        isInvalid={!!errors.eventTime}
                      />
                      <Form.Control.Feedback type="invalid">{errors.eventTime}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Venue, address, or online"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="What is the event about? Who can join? Any requirements?"
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button type="submit" variant="primary" disabled={submitting}>
                    {submitting ? 'Creating...' : 'Create event'}
                  </Button>
                  <Button as={Link} to="/events" variant="outline-secondary" type="button">Cancel</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEvent;
