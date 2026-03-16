import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert, Button } from 'react-bootstrap';
import { useAuthContext } from '../context/AuthContext';
import ConversationsList from './ConversationsList';
import ChatWindow from './ChatWindow';
import BroadcastModal from './BroadcastModal';

const API_BASE_URL = 'http://localhost:3000';

const Messages = () => {
  const { user } = useAuthContext();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBroadcast, setShowBroadcast] = useState(false);

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/messages/conversations/${user.email}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to load conversations');
      }
      
      setConversations(data);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('Conversations error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/unread/${user.email}`);
      const data = await response.json();
      
      if (response.ok) {
        setUnreadCount(data.unreadCount);
      }
    } catch (err) {
      console.error('Unread count error:', err);
    }
  };

  // Fetch messages between users
  const fetchMessages = async (partnerId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${user.email}/${partnerId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to load messages');
      }
      
      setMessages(data);
    } catch (err) {
      setError(err.message);
      console.error('Messages error:', err);
    }
  };

  // Send message
  const sendMessage = async (messageText) => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: user.email,
          to: selectedConversation.userId,
          message: messageText,
          messageType: 'personal'
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      // Reload messages and conversations
      await fetchMessages(selectedConversation.userId);
      await fetchConversations();
      await fetchUnreadCount();
      
    } catch (err) {
      setError(err.message);
      console.error('Send message error:', err);
    }
  };

  // Send broadcast
  const sendBroadcast = async (broadcastData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/broadcast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: user.email,
          ...broadcastData
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send broadcast');
      }
      
      setShowBroadcast(false);
      alert('Broadcast sent successfully!');
      
    } catch (err) {
      setError(err.message);
      console.error('Broadcast error:', err);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchConversations();
      fetchUnreadCount();
      
      // Refresh every 10 seconds
      const interval = setInterval(() => {
        if (selectedConversation) {
          fetchMessages(selectedConversation.userId);
        }
        fetchUnreadCount();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [user, selectedConversation]);

  const handleSelectConversation = async (conversation) => {
    setSelectedConversation(conversation);
    await fetchMessages(conversation.userId);
    // Reload conversations to update unread counts
    fetchConversations();
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              Messages 
              {unreadCount > 0 && (
                <Badge bg="danger" className="ms-2">
                  {unreadCount} unread
                </Badge>
              )}
            </h2>
            {user?.role === 'admin' && (
              <Button 
                variant="primary"
                onClick={() => setShowBroadcast(true)}
              >
                Send Broadcast
              </Button>
            )}
          </div>

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <Row className="messages-container">
            <Col md={4} className="conversations-column">
              <ConversationsList
                conversations={conversations}
                selectedConversation={selectedConversation}
                onSelectConversation={handleSelectConversation}
              />
            </Col>
            <Col md={8} className="chat-column">
              {selectedConversation ? (
                <ChatWindow
                  messages={messages}
                  onSendMessage={sendMessage}
                  currentUser={user}
                  selectedConversation={selectedConversation}
                />
              ) : (
                <Card className="h-100">
                  <Card.Body className="d-flex justify-content-center align-items-center text-center text-muted">
                    <div>
                      <h5>Welcome to Messages</h5>
                      <p>Select a conversation from the list to start messaging</p>
                      {conversations.length === 0 && (
                        <p className="small">
                          No conversations yet. Messages will appear here when you start chatting with other users.
                        </p>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      {user?.role === 'admin' && (
        <BroadcastModal
          show={showBroadcast}
          onHide={() => setShowBroadcast(false)}
          onSendBroadcast={sendBroadcast}
        />
      )}
    </Container>
  );
};

export default Messages;