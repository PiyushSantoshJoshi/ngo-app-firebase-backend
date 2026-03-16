import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { eventsAPI } from '../api/community';

const Events = () => {
  const { isNgo } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upcomingOnly, setUpcomingOnly] = useState(true);

  useEffect(() => {
    let cancelled = false;
    eventsAPI.getList(upcomingOnly)
      .then((data) => { if (!cancelled) setEvents(data); })
      .catch((err) => { if (!cancelled) setError(err.response?.data?.error || 'Failed to load events'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [upcomingOnly]);

  const formatDate = (iso) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { dateStyle: 'medium' }) + ' ' + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Container className="py-5 my-4">
      <Row className="mb-4">
        <Col>
          <h1 className="page-title">Events</h1>
          <p className="page-subtitle">Upcoming drives, fundraisers, and community events by NGOs</p>
        </Col>
        <Col xs="auto" className="d-flex align-items-center gap-3">
          {isNgo && (
            <Button as={Link} to="/events/add" variant="primary" size="sm">
              <i className="bi bi-plus-lg me-1" /> Add event
            </Button>
          )}
          <div className="form-check form-switch mb-0">
            <input className="form-check-input" type="checkbox" id="upcomingOnly" checked={upcomingOnly} onChange={(e) => setUpcomingOnly(e.target.checked)} />
            <label className="form-check-label" htmlFor="upcomingOnly">Upcoming only</label>
          </div>
        </Col>
      </Row>
      {loading && <div className="text-center py-5"><Spinner animation="border" variant="primary" /><p className="mt-2">Loading events...</p></div>}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && (
        events.length === 0 ? (
          <div className="search-filter-card text-center py-5">
            <i className="bi bi-calendar-event display-4 text-muted mb-3 d-block" />
            <h5 className="text-muted">No events found</h5>
            <p className="text-muted mb-0">Check back later or browse <Link to="/search">NGOs</Link> to connect.</p>
          </div>
        ) : (
          <Row>
            {events.map((event) => (
              <Col key={event.id} md={6} lg={4} className="mb-4">
                <Card className="h-100 ngo-card">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Badge bg="primary" className="mb-2">{formatDate(event.eventDate).split(' ')[0]}</Badge>
                    </div>
                    <h5 className="card-title">{event.title}</h5>
                    {event.location && <p className="text-muted small mb-1"><i className="bi bi-geo-alt me-1" /> {event.location}</p>}
                    <p className="card-text small text-muted mb-2">{event.description || 'No description.'}</p>
                    <small className="text-muted">By NGO</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )
      )}
    </Container>
  );
};

export default Events;
