import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const BroadcastModal = ({ show, onHide, onSendBroadcast }) => {
  const [broadcastData, setBroadcastData] = useState({
    message: '',
    recipientType: 'all'
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await onSendBroadcast(broadcastData);
      setBroadcastData({ message: '', recipientType: 'all' });
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    setBroadcastData({ message: '', recipientType: 'all' });
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Send Broadcast Message</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Recipient Type</Form.Label>
            <Form.Select
              value={broadcastData.recipientType}
              onChange={(e) => setBroadcastData({ ...broadcastData, recipientType: e.target.value })}
            >
              <option value="all">All Users (Users + NGOs)</option>
              <option value="users">Regular Users Only</option>
              <option value="ngos">NGOs Only</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter your broadcast message..."
              value={broadcastData.message}
              onChange={(e) => setBroadcastData({ ...broadcastData, message: e.target.value })}
              required
            />
          </Form.Group>

          <Alert variant="info">
            <strong>Note:</strong> This message will be sent to all {broadcastData.recipientType === 'all' ? 'users and NGOs' : 
            broadcastData.recipientType === 'users' ? 'regular users' : 'NGOs'} in the system.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={sending || !broadcastData.message.trim()}>
            {sending ? 'Sending...' : 'Send Broadcast'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default BroadcastModal;