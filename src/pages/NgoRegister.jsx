import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NgoRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    fullAddress: '',
    category: '',
    registrationId: '',
    contact: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { registerNgoUser, loading, error, clearAuthError } = useAuth();
  const navigate = useNavigate();

  const categories = [
    'Education',
    'Healthcare',
    'Environment',
    'Human Rights',
    'Poverty Alleviation',
    'Women Empowerment',
    'Child Welfare',
    'Disaster Relief',
    'Community Development',
    'Other'
  ];

  useEffect(() => {
    clearAuthError();
  }, [clearAuthError]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'NGO name is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.fullAddress.trim()) {
      newErrors.fullAddress = 'Full address is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.registrationId.trim()) {
      newErrors.registrationId = 'Registration ID is required';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await registerNgoUser({
        name: formData.name,
        city: formData.city,
        fullAddress: formData.fullAddress,
        category: formData.category,
        registrationId: formData.registrationId,
        contact: formData.contact,
        email: formData.email,
        password: formData.password
      });
      
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/login', { 
          state: { 
            message: 'NGO registration submitted successfully! Please wait for admin approval before logging in.' 
          }
        });
      }
    } catch (err) {
      console.error('NGO registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-5 my-4">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Card className="auth-card">
            <Card.Header>
              <h4 className="mb-0 fw-bold">NGO Registration</h4>
            </Card.Header>
            <Card.Body>
              {error && (
                <Alert variant="danger" onClose={clearAuthError} dismissible>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>NGO Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                        placeholder="Enter NGO name"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City *</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        isInvalid={!!errors.city}
                        placeholder="Enter city"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Full Address *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="fullAddress"
                    value={formData.fullAddress}
                    onChange={handleChange}
                    isInvalid={!!errors.fullAddress}
                    placeholder="Enter complete address"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullAddress}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category *</Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        isInvalid={!!errors.category}
                      >
                        <option value="">Select category</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.category}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Registration ID *</Form.Label>
                      <Form.Control
                        type="text"
                        name="registrationId"
                        value={formData.registrationId}
                        onChange={handleChange}
                        isInvalid={!!errors.registrationId}
                        placeholder="Enter registration ID"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.registrationId}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact Number *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        isInvalid={!!errors.contact}
                        placeholder="Enter contact number"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contact}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        placeholder="Enter email address"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password *</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                        placeholder="Enter password"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password *</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                        placeholder="Confirm password"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Alert variant="info" className="mb-3">
                  <strong>Note:</strong> Your NGO registration will be reviewed by our admin team. 
                  You will be able to login once your registration is approved.
                </Alert>

                <Button
                  type="submit"
                  variant="info"
                  className="w-100 mb-3"
                  disabled={loading || isSubmitting}
                >
                  {loading || isSubmitting ? 'Submitting...' : 'Submit NGO Registration'}
                </Button>

                <div className="text-center">
                  <p className="mb-2">
                    Already have an account?{' '}
                    <Link to="/login" className="text-decoration-none">
                      Login here
                    </Link>
                  </p>
                  <p className="mb-0">
                    Are you a regular user?{' '}
                    <Link to="/register" className="text-decoration-none">
                      Register here
                    </Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NgoRegister;
