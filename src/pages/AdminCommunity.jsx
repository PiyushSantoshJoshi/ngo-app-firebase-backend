import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Tab, Tabs, Table, Badge, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { adminCommunityAPI, announcementsAPI } from '../api/community';

const formatDate = (v) => {
  if (!v) return '—';
  const sec = v.seconds ?? v._seconds;
  if (typeof sec === 'number') return new Date(sec * 1000).toLocaleString();
  return new Date(v).toLocaleString();
};

const AdminCommunity = () => {
  const { user } = useAuth();
  const [contactList, setContactList] = useState([]);
  const [volunteerList, setVolunteerList] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState({ contact: true, volunteer: true, testimonials: true });
  const [error, setError] = useState(null);
  const [announcementForm, setAnnouncementForm] = useState({ title: '', body: '' });
  const [announcementSubmitting, setAnnouncementSubmitting] = useState(false);
  const [announcementStatus, setAnnouncementStatus] = useState(null);

  useEffect(() => {
    adminCommunityAPI.getContactSubmissions().then(setContactList).catch(() => {}).finally(() => setLoading(l => ({ ...l, contact: false })));
    adminCommunityAPI.getVolunteerInterests().then(setVolunteerList).catch(() => {}).finally(() => setLoading(l => ({ ...l, volunteer: false })));
    adminCommunityAPI.getTestimonials().then(setTestimonials).catch(() => {}).finally(() => setLoading(l => ({ ...l, testimonials: false })));
  }, []);

  const handleApproveTestimonial = async (id) => {
    try {
      await adminCommunityAPI.approveTestimonial(id);
      setTestimonials(prev => prev.map(t => t.id === id ? { ...t, approved: true } : t));
    } catch (e) {
      setError('Failed to approve');
    }
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    setAnnouncementStatus(null);
    setAnnouncementSubmitting(true);
    try {
      await announcementsAPI.create({ title: announcementForm.title, body: announcementForm.body, authorEmail: user?.email });
      setAnnouncementStatus('success');
      setAnnouncementForm({ title: '', body: '' });
    } catch (err) {
      setAnnouncementStatus(err.response?.data?.error || 'Failed to create');
    } finally {
      setAnnouncementSubmitting(false);
    }
  };

  return (
    <Container className="py-5 my-4">
      <Row className="mb-4">
        <Col>
          <h1 className="page-title">Community & outreach</h1>
          <p className="page-subtitle">Announcements, contact submissions, volunteer interests, testimonials</p>
        </Col>
        <Col xs="auto">
          <Button as={Link} to="/admin" variant="outline-primary" size="sm">Back to dashboard</Button>
        </Col>
      </Row>
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

      <Tabs defaultActiveKey="announcements" className="mb-4">
        <Tab eventKey="announcements" title="Post announcement">
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3">Create announcement</h5>
              {announcementStatus === 'success' && <Alert variant="success">Announcement published.</Alert>}
              {announcementStatus && announcementStatus !== 'success' && <Alert variant="danger">{announcementStatus}</Alert>}
              <Form onSubmit={handleCreateAnnouncement}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control value={announcementForm.title} onChange={(e) => setAnnouncementForm(f => ({ ...f, title: e.target.value }))} required placeholder="Announcement title" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Body</Form.Label>
                  <Form.Control as="textarea" rows={4} value={announcementForm.body} onChange={(e) => setAnnouncementForm(f => ({ ...f, body: e.target.value }))} required placeholder="Content..." />
                </Form.Group>
                <Button type="submit" variant="primary" disabled={announcementSubmitting}>{announcementSubmitting ? 'Publishing...' : 'Publish'}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="contact" title={`Contact (${contactList.length})`}>
          {loading.contact ? <Spinner /> : (
            <Card>
              <Card.Body>
                {contactList.length === 0 ? <p className="text-muted mb-0">No contact submissions yet.</p> : (
                  <Table responsive size="sm">
                    <thead><tr><th>Date</th><th>Name</th><th>Email</th><th>Subject</th><th>Message</th></tr></thead>
                    <tbody>
                      {contactList.map((c) => (
                        <tr key={c.id}>
                          <td>{formatDate(c.createdAt)}</td>
                          <td>{c.name}</td>
                          <td>{c.email}</td>
                          <td>{c.subject}</td>
                          <td><small>{c.message?.slice(0, 80)}{c.message?.length > 80 ? '…' : ''}</small></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          )}
        </Tab>
        <Tab eventKey="volunteer" title={`Volunteer (${volunteerList.length})`}>
          {loading.volunteer ? <Spinner /> : (
            <Card>
              <Card.Body>
                {volunteerList.length === 0 ? <p className="text-muted mb-0">No volunteer interests yet.</p> : (
                  <Table responsive size="sm">
                    <thead><tr><th>Date</th><th>NGO email</th><th>User email</th><th>Message</th></tr></thead>
                    <tbody>
                      {volunteerList.map((v) => (
                        <tr key={v.id}>
                          <td>{formatDate(v.createdAt)}</td>
                          <td>{v.ngoEmail}</td>
                          <td>{v.userEmail}</td>
                          <td><small>{v.message?.slice(0, 60)}{v.message?.length > 60 ? '…' : ''}</small></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          )}
        </Tab>
        <Tab eventKey="testimonials" title="Testimonials">
          {loading.testimonials ? <Spinner /> : (
            <Card>
              <Card.Body>
                {testimonials.length === 0 ? <p className="text-muted mb-0">No testimonials yet.</p> : (
                  <div className="d-flex flex-column gap-3">
                    {testimonials.map((t) => (
                      <div key={t.id} className="p-3 border rounded">
                        <p className="mb-1 small">{t.text}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">{t.authorName} · {t.role || '—'}</small>
                          {!t.approved && <Button size="sm" variant="success" onClick={() => handleApproveTestimonial(t.id)}>Approve</Button>}
                          {t.approved && <Badge bg="success">Approved</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminCommunity;
