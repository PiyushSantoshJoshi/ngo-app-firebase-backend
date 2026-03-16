import React, { useState, useRef, useEffect } from 'react';
import { Card, Form, Button, InputGroup, Badge } from 'react-bootstrap';

const ChatWindow = ({ messages, onSendMessage, currentUser, selectedConversation }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return '';
    }
  };

  return (
    <Card className="h-100">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0">{selectedConversation.userName}</h5>
          <small className="text-muted">
            {selectedConversation.userEmail}
            <Badge 
              bg={selectedConversation.userRole === 'admin' ? 'danger' : selectedConversation.userRole === 'ngo' ? 'success' : 'primary'}
              className="ms-2"
            >
              {selectedConversation.userRole}
            </Badge>
          </small>
        </div>
      </Card.Header>

      <Card.Body style={{ height: '400px', overflowY: 'auto', padding: '15px' }}>
        {messages.length === 0 ? (
          <div className="text-center text-muted mt-5">
            <p>No messages yet</p>
            <p>Start the conversation by sending a message!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`d-flex mb-3 ${message.from === currentUser.email ? 'justify-content-end' : 'justify-content-start'}`}
            >
              <div
                className={`rounded p-3 ${message.from === currentUser.email ? 'bg-primary text-white' : 'bg-light'}`}
                style={{ maxWidth: '70%' }}
              >
                <div className="message-text">{message.message}</div>
                <small className={`d-block mt-1 ${message.from === currentUser.email ? 'text-white-50' : 'text-muted'}`}>
                  {formatTimestamp(message.timestamp)}
                  {message.read && message.from === currentUser.email && (
                    <span className="ms-2">✓ Read</span>
                  )}
                </small>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </Card.Body>

      <Card.Footer>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button variant="primary" type="submit" disabled={!newMessage.trim()}>
              Send
            </Button>
          </InputGroup>
        </Form>
      </Card.Footer>
    </Card>
  );
};

export default ChatWindow;