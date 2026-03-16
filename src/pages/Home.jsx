import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { announcementsAPI, eventsAPI, testimonialsAPI } from '../api/community';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loadingAnn, setLoadingAnn] = useState(true);
  const [loadingEv, setLoadingEv] = useState(true);
  const [loadingTest, setLoadingTest] = useState(true);

  useEffect(() => {
    announcementsAPI.getList(5).then(setAnnouncements).catch(() => {}).finally(() => setLoadingAnn(false));
    eventsAPI.getList(true).then((d) => setUpcomingEvents(d.slice(0, 3))).catch(() => {}).finally(() => setLoadingEv(false));
    testimonialsAPI.getList().then(setTestimonials).catch(() => {}).finally(() => setLoadingTest(false));
  }, []);

  const features = [
    {
      icon: 'bi-building',
      title: 'NGO Directory',
      description: 'Find and connect with NGOs in your area. Search by location, category, or name.'
    },
    {
      icon: 'bi-clipboard-check',
      title: 'Requirements Management',
      description: 'Post and discover requirements. NGOs share what they need; users help fulfill them.'
    },
    {
      icon: 'bi-chat-dots',
      title: 'Direct Messaging',
      description: 'Communicate securely with NGOs and other users through our messaging system.'
    },
    {
      icon: 'bi-patch-check',
      title: 'Verified NGOs',
      description: 'All NGOs are verified and approved by our admin team to ensure authenticity.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Registered NGOs' },
    { number: '50+', label: 'Cities Covered' },
    { number: '1000+', label: 'Requirements Posted' },
    { number: '10K+', label: 'Community Members' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <Container className="position-relative">
          <Row className="align-items-center py-4 py-lg-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">
                Connecting NGOs with Communities
              </h1>
              <p className="lead mb-4">
                Join our platform to discover NGOs, post requirements, and make a difference.
                Whether you're an organization looking for support or a community member wanting to help, we've got you covered.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                {!isAuthenticated ? (
                  <>
                    <Button as={Link} to="/register" variant="light" size="lg" className="px-4">
                      Get Started
                    </Button>
                    <Button as={Link} to="/ngo-register" variant="outline-light" size="lg" className="px-4">
                      Register NGO
                    </Button>
                  </>
                ) : (
                  <Button as={Link} to="/search" variant="light" size="lg" className="px-4">
                    Explore NGOs
                  </Button>
                )}
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="hero-icon-wrap">
                <i className="bi bi-people-fill" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Latest Announcements */}
      <section className="py-4 bg-white border-bottom">
        <Container>
          <Row className="mb-3">
            <Col>
              <h2 className="fw-bold mb-0" style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text)' }}>
                <i className="bi bi-megaphone me-2 text-primary" /> Latest updates
              </h2>
            </Col>
            <Col xs="auto">
              <Link to="/contact" className="small text-primary text-decoration-none">Contact us</Link>
            </Col>
          </Row>
          {loadingAnn ? (
            <div className="text-muted small">Loading...</div>
          ) : announcements.length === 0 ? (
            <p className="text-muted small mb-0">No announcements yet. Check back later.</p>
          ) : (
            <Row>
              {announcements.slice(0, 3).map((a) => (
                <Col key={a.id} md={4} className="mb-3">
                  <div className="feature-card p-3 h-100">
                    <h6 className="fw-bold mb-1">{a.title}</h6>
                    <p className="small text-muted mb-0" style={{ lineHeight: 1.5 }}>{typeof a.body === 'string' ? a.body.slice(0, 120) + (a.body.length > 120 ? '…' : '') : ''}</p>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold mb-2" style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text)' }}>
                Why Choose NGO Community?
              </h2>
              <p className="text-muted lead mb-0">
                Everything you need to connect and collaborate
              </p>
            </Col>
          </Row>
          <Row>
            {features.map((item, index) => (
              <Col key={index} md={6} lg={3} className="mb-4">
                <div className="feature-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="feature-icon-box">
                    <i className={`bi ${item.icon}`} />
                  </div>
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <Container>
          <Row className="text-center g-4">
            {stats.map((stat, index) => (
              <Col key={index} xs={6} md={3}>
                <div className="stats-number">{stat.number}</div>
                <div className="stats-label">{stat.label}</div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Upcoming Events */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="fw-bold mb-1" style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text)' }}>
                Upcoming events
              </h2>
              <p className="text-muted mb-0">Drives, fundraisers & community events</p>
            </Col>
            <Col xs="auto" className="d-flex align-items-end">
              <Button as={Link} to="/events" variant="outline-primary" size="sm">View all</Button>
            </Col>
          </Row>
          {loadingEv ? (
            <div className="text-center py-3"><Spinner animation="border" size="sm" variant="primary" /></div>
          ) : upcomingEvents.length === 0 ? (
            <p className="text-muted small mb-0">No upcoming events. <Link to="/events">View past events</Link>.</p>
          ) : (
            <Row>
              {upcomingEvents.map((event) => (
                <Col key={event.id} md={4} className="mb-3">
                  <Card className="h-100 ngo-card">
                    <Card.Body className="py-3">
                      <small className="text-primary fw-medium">{event.eventDate ? new Date(event.eventDate).toLocaleDateString(undefined, { dateStyle: 'medium' }) : '—'}</small>
                      <h6 className="fw-bold mt-1 mb-1">{event.title}</h6>
                      {event.location && <p className="small text-muted mb-0"><i className="bi bi-geo-alt me-1" /> {event.location}</p>}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold mb-2" style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text)' }}>
                How It Works
              </h2>
              <p className="text-muted">Simple steps to get started</p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="text-center mb-4">
              <div className="step-num mx-auto">1</div>
              <h5 className="fw-bold mb-2">Register</h5>
              <p className="text-muted small mb-0">Create your account as a user or register your NGO</p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="step-num mx-auto">2</div>
              <h5 className="fw-bold mb-2">Connect</h5>
              <p className="text-muted small mb-0">Search for NGOs or post requirements</p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="step-num mx-auto">3</div>
              <h5 className="fw-bold mb-2">Collaborate</h5>
              <p className="text-muted small mb-0">Message, collaborate, and make an impact</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-5" style={{ background: 'var(--color-bg)' }}>
          <Container>
            <Row className="text-center mb-4">
              <Col>
                <h2 className="fw-bold mb-1" style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text)' }}>
                  What people say
                </h2>
                <p className="text-muted mb-0">Stories from our community</p>
              </Col>
            </Row>
            <Row>
              {testimonials.slice(0, 6).map((t) => (
                <Col key={t.id} md={6} lg={4} className="mb-3">
                  <div className="feature-card p-3 h-100">
                    <p className="small mb-2" style={{ lineHeight: 1.6 }}>&ldquo;{t.text}&rdquo;</p>
                    <div className="small text-muted">{t.authorName}{t.role ? ` · ${t.role}` : ''}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-5" style={{ background: 'var(--color-bg)' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="fw-bold mb-3" style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text)' }}>
                Ready to Make a Difference?
              </h2>
              <p className="lead text-muted mb-4">
                Join thousands of users who are already making an impact. Start your journey today.
              </p>
              {!isAuthenticated ? (
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <Button as={Link} to="/register" variant="primary" size="lg" className="px-4">
                    Join Now
                  </Button>
                  <Button as={Link} to="/ngo-register" variant="outline-primary" size="lg" className="px-4">
                    Register Your NGO
                  </Button>
                </div>
              ) : (
                <Button as={Link} to="/search" variant="primary" size="lg" className="px-4">
                  Explore NGOs
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
