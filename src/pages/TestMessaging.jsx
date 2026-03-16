import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Alert, Table, Badge } from 'react-bootstrap';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const TestMessaging = () => {
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const createTestUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/test/create-test-users`);
      setMessage(response.data.message);
      await fetchTestData();
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to create test users');
    } finally {
      setLoading(false);
    }
  };

  const createTestMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/test/create-test-messages`);
      setMessage(response.data.message);
      await fetchTestData();
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to create test messages');
    } finally {
      setLoading(false);
    }
  };

  const fetchTestData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/test/test-data`);
      setTestData(response.data);
    } catch (error) {
      console.error('Failed to fetch test data');
    }
  };

  const clearTestData = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`${API_BASE_URL}/test/clear-test-data`);
      setMessage(response.data.message);
      setTestData(null);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to clear test data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestData();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Messaging System Test</h2>
      
      {message && (
        <Alert variant="info" dismissible onClose={() => setMessage('')}>
          {message}
        </Alert>
      )}

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Test Data Setup</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted">
                Use these buttons to set up test data for messaging system
              </p>
              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  onClick={createTestUsers}
                  disabled={loading}
                >
                  Create Test Users
                </Button>
                <Button 
                  variant="success" 
                  onClick={createTestMessages}
                  disabled={loading}
                >
                  Create Test Messages
                </Button>
                <Button 
                  variant="danger" 
                  onClick={clearTestData}
                  disabled={loading}
                >
                  Clear Test Data
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Test Login Credentials</h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>user1@test.com</td>
                    <td>password123</td>
                    <td><Badge bg="primary">User</Badge></td>
                  </tr>
                  <tr>
                    <td>user2@test.com</td>
                    <td>password123</td>
                    <td><Badge bg="primary">User</Badge></td>
                  </tr>
                  <tr>
                    <td>ngo1@test.com</td>
                    <td>password123</td>
                    <td><Badge bg="success">NGO</Badge></td>
                  </tr>
                  <tr>
                    <td>admin@test.com</td>
                    <td>password123</td>
                    <td><Badge bg="danger">Admin</Badge></td>
                  </tr>
                </tbody>
              </Table>
              <small className="text-muted">
                Use these credentials to login and test messaging between different users
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {testData && (
        <Row>
          <Col md={6}>
            <Card>
              <Card.Header>
                <h6>Test Users ({testData.users.length})</h6>
              </Card.Header>
              <Card.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {testData.users.map(user => (
                  <div key={user.id} className="mb-2 p-2 border rounded">
                    <strong>{user.name}</strong>
                    <br />
                    <small>{user.email}</small>
                    <Badge bg={
                      user.role === 'admin' ? 'danger' : 
                      user.role === 'ngo' ? 'success' : 'primary'
                    } className="ms-2">
                      {user.role}
                    </Badge>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card>
              <Card.Header>
                <h6>Test Messages ({testData.messages.length})</h6>
              </Card.Header>
              <Card.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {testData.messages.map(msg => (
                  <div key={msg.id} className="mb-2 p-2 border rounded">
                    <div>
                      <strong>From:</strong> {msg.from}
                    </div>
                    <div>
                      <strong>To:</strong> {msg.to}
                    </div>
                    <div className="text-truncate">
                      <strong>Message:</strong> {msg.message}
                    </div>
                    <small className="text-muted">
                      {new Date(msg.timestamp?.toDate?.() || msg.timestamp).toLocaleString()}
                    </small>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Card className="mt-4">
        <Card.Header>
          <h5>Testing Instructions</h5>
        </Card.Header>
        <Card.Body>
          <ol>
            <li>Click "Create Test Users" to create sample users</li>
            <li>Click "Create Test Messages" to create sample conversations</li>
            <li>Open two different browser windows (or incognito tabs)</li>
            <li>Login with different test accounts in each window</li>
            <li>Navigate to the Messages page in both windows</li>
            <li>Try sending messages between different users</li>
            <li>Test conversations, unread counts, and real-time updates</li>
          </ol>
          
          <h6>Expected Behavior:</h6>
          <ul>
            <li>Conversations should appear in the left sidebar</li>
            <li>Unread messages should show badge counts</li>
            <li>Messages should display in real-time (auto-refresh every 10 seconds)</li>
            <li>Sent messages should appear immediately</li>
            <li>Admin should see "Send Broadcast" button</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TestMessaging;