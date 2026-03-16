import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPendingNgos } from '../redux/ngoSlice';
import { fetchPendingRequirements } from '../redux/requirementSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { pendingNgos, loading } = useSelector((state) => state.ngo);
  const { pendingRequirements, loading: reqLoading } = useSelector((state) => state.requirement);

  useEffect(() => {
    dispatch(getPendingNgos());
    dispatch(fetchPendingRequirements());
  }, [dispatch]);

  const stats = [
    { title: 'Pending NGO Approvals', value: pendingNgos.length, variant: 'warning', icon: 'clock-history', link: '/admin/pending-ngos' },
    { title: 'Pending Requirements', value: pendingRequirements.length, variant: 'warning', icon: 'clipboard-check', link: '/admin/pending-requirements' },
    { title: 'Total NGOs', value: '500+', variant: 'info', icon: 'building', link: '/search' },
    { title: 'Active Requirements', value: '150+', variant: 'success', icon: 'list-check', link: '/requirements' }
  ];

  const quickActions = [
    { title: 'Review NGO Applications', description: 'Approve or reject pending NGO registrations', icon: 'clipboard-check', variant: 'warning', link: '/admin/pending-ngos', disabled: pendingNgos.length === 0 },
    { title: 'Review Requirements', description: 'Approve newly submitted requirements', icon: 'receipt', variant: 'warning', link: '/admin/pending-requirements', disabled: pendingRequirements.length === 0 },
    { title: 'Community & outreach', description: 'Announcements, contact forms, volunteer interests, testimonials', icon: 'megaphone', variant: 'info', link: '/admin/community' },
    { title: 'View Analytics', description: 'Platform usage statistics and reports', icon: 'bar-chart', variant: 'success', link: '/admin/analytics' },
    { title: 'System Settings', description: 'Configure platform settings and preferences', icon: 'gear', variant: 'secondary', link: '/admin/settings' }
  ];

  return (
    <Container className="py-5 my-4">
      <Row className="mb-4">
        <Col>
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">Welcome to the NGO Community administration panel</p>
        </Col>
      </Row>

      {/* Statistics Cards */}
      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col key={index} md={6} lg={3} className="mb-3">
            <Card className="h-100">
              <Card.Body className="text-center">
                <div className="feature-icon-box mx-auto mb-2"><i className={`bi bi-${stat.icon}`} /></div>
                <h3 className={`text-${stat.variant} fw-bold mb-2`}>
                  {stat.value}
                </h3>
                <h6 className="text-muted mb-3">{stat.title}</h6>
                <Button 
                  as={Link} 
                  to={stat.link} 
                  variant={`outline-${stat.variant}`} 
                  size="sm"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Actions */}
      <Row className="mb-4">
        <Col>
          <h4 className="fw-bold mb-3">Quick Actions</h4>
        </Col>
      </Row>

      <Row>
        {quickActions.map((action, index) => (
          <Col key={index} md={6} lg={3} className="mb-3">
            <Card className="h-100">
              <Card.Body className="text-center">
                <div className="feature-icon-box mx-auto mb-2"><i className={`bi bi-${action.icon}`} /></div>
                <h6 className="fw-bold mb-2">{action.title}</h6>
                <p className="text-muted small mb-3">{action.description}</p>
                <Button 
                  as={Link} 
                  to={action.link} 
                  variant={action.variant} 
                  size="sm"
                  disabled={action.disabled}
                  className="w-100"
                >
                  {action.disabled ? 'No Pending Items' : 'Take Action'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recent Activity */}
      <Row className="mb-4">
        <Col>
          <h4 className="fw-bold mb-3">Recent Activity</h4>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-light">
              <h6 className="mb-0">Recent NGO Registrations</h6>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-3">
                  <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                  Loading...
                </div>
              ) : pendingNgos.length === 0 ? (
                <p className="text-muted text-center py-3 mb-0">
                  No pending NGO registrations
                </p>
              ) : (
                <div>
                  {pendingNgos.slice(0, 5).map((ngo, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                      <div>
                        <h6 className="mb-1">{ngo.name}</h6>
                        <small className="text-muted">
                          {ngo.city} • {ngo.category} • {ngo.email}
                        </small>
                      </div>
                      <Badge bg="warning">Pending</Badge>
                    </div>
                  ))}
                  {pendingNgos.length > 5 && (
                    <div className="text-center mt-3">
                      <Button as={Link} to="/admin/pending-ngos" variant="outline-primary" size="sm">
                        View All ({pendingNgos.length})
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-light">
              <h6 className="mb-0">System Status</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center py-2">
                <span>Platform Status</span>
                <Badge bg="success">Online</Badge>
              </div>
              <div className="d-flex justify-content-between align-items-center py-2">
                <span>Database</span>
                <Badge bg="success">Connected</Badge>
              </div>
              <div className="d-flex justify-content-between align-items-center py-2">
                <span>API Services</span>
                <Badge bg="success">Running</Badge>
              </div>
              <div className="d-flex justify-content-between align-items-center py-2">
                <span>Last Backup</span>
                <small className="text-muted">2 hours ago</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
