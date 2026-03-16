import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const NgoContact = ({ show, handleClose, ngo }) => {
  if (!ngo) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{ngo.name || 'NGO Details'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Category:</strong> {ngo.category}</p>
        <p><strong>City:</strong> {ngo.city}</p>
        <p><strong>Contact:</strong> {ngo.contact}</p>
        <p><strong>Email:</strong> {ngo.email}</p>
        <p><strong>Address:</strong> {ngo.fullAddress}</p>
        <p><strong>Registration ID:</strong> {ngo.registrationId}</p>
        <p><strong>Status:</strong> {ngo.status}</p>
        <p><strong>Created At:</strong> {new Date(ngo.createdAt).toLocaleString()}</p>
        <p><strong>Approved By:</strong> {ngo.approvedBy || 'Not Approved'}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NgoContact;
