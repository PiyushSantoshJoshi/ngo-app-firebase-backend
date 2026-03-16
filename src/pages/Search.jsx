import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge, Spinner, Alert, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { searchNgos, setSearchFilters, clearSearchResults } from '../redux/ngoSlice';
import { useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { volunteerAPI } from '../api/community';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [volunteerNgo, setVolunteerNgo] = useState(null);
  const [volunteerMessage, setVolunteerMessage] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [volunteerSubmitting, setVolunteerSubmitting] = useState(false);
  const [volunteerStatus, setVolunteerStatus] = useState(null);
  const { user } = useAuth();

  const dispatch = useDispatch();
  const { ngos, loading, error, searchFilters } = useSelector((state) => state.ngo);

  const cities = useMemo(() => {
    const uniqueCities = [...new Set(ngos.map(ngo => ngo.city))];
    return uniqueCities.sort();
  }, [ngos]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(ngos.map(ngo => ngo.category))];
    return uniqueCategories.sort();
  }, [ngos]);

  useEffect(() => {
    // Load initial search results
    handleSearch();
  }, []);

  const handleSearch = () => {
    const filters = {};
    if (selectedCity) filters.city = selectedCity;
    if (searchTerm) filters.name = searchTerm;
    
    dispatch(setSearchFilters(filters));
    dispatch(searchNgos(filters));
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedCity('');
    setSelectedCategory('');
    dispatch(clearSearchResults());
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    if (city) {
      dispatch(searchNgos({ city }));
    } else {
      handleSearch();
    }
  };

  const filteredNgos = useMemo(() => {
    let filtered = ngos;
    
    if (selectedCategory) {
      filtered = filtered.filter(ngo => ngo.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(ngo => 
        ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ngo.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [ngos, selectedCategory, searchTerm]);

  useEffect(() => {
    if (user?.email) setVolunteerEmail(user.email);
  }, [user]);

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    if (!volunteerNgo || !volunteerEmail || !volunteerMessage.trim()) return;
    setVolunteerSubmitting(true);
    setVolunteerStatus(null);
    try {
      await volunteerAPI.submitInterest({ ngoEmail: volunteerNgo.email, userEmail: volunteerEmail, message: volunteerMessage.trim() });
      setVolunteerStatus('success');
      setVolunteerNgo(null);
      setVolunteerMessage('');
    } catch (err) {
      setVolunteerStatus('error');
    } finally {
      setVolunteerSubmitting(false);
    }
  };

  const openVolunteerModal = (ngo) => {
    setVolunteerNgo(ngo);
    setVolunteerStatus(null);
    setVolunteerMessage('');
  };

  return (
    <Container className="py-5 my-4">
      <Row className="mb-4">
        <Col>
          <h1 className="page-title">Search NGOs</h1>
          <p className="page-subtitle">Find NGOs in your area or by category</p>
        </Col>
      </Row>

      {/* Search Filters */}
      <div className="search-filter-card mb-4">
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Search by Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter NGO name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Select
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                >
                  <option value="">All Cities</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-end">
              <div className="d-flex gap-2 w-100">
                <Button variant="primary" onClick={handleSearch} className="flex-fill">
                  Search
                </Button>
                <Button variant="outline-secondary" onClick={handleClear} className="flex-fill">
                  Clear
                </Button>
              </div>
            </Col>
          </Row>
      </div>

      {/* Results */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Searching NGOs...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <>
          <Row className="mb-3">
            <Col>
              <h5>
                Results: {filteredNgos.length} NGO{filteredNgos.length !== 1 ? 's' : ''} found
              </h5>
            </Col>
          </Row>

          {filteredNgos.length === 0 ? (
            <div className="search-filter-card text-center py-5">
              <i className="bi bi-search display-4 text-muted mb-3 d-block" />
              <h5 className="text-muted">No NGOs found</h5>
              <p className="text-muted mb-0">Try adjusting your search criteria</p>
            </div>
          ) : (
            <Row>
              {filteredNgos.map((ngo) => (
                <Col key={ngo.id} lg={6} xl={4} className="mb-4">
                  <div className="ngo-card">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-1">{ngo.name}</h5>
                      <Badge className="badge-approved">Approved</Badge>
                    </div>
                    <p className="text-muted small mb-2">
                      <i className="bi bi-geo-alt me-1" /> {ngo.city}
                    </p>
                    <Badge bg="primary" className="mb-3">{ngo.category}</Badge>
                    <p className="card-text small mb-3">{ngo.fullAddress}</p>
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                      <small className="text-muted">
                        <i className="bi bi-telephone me-1" /> {ngo.contact}
                      </small>
                      <div className="d-flex gap-1">
                        <Button variant="outline-primary" size="sm" onClick={() => openVolunteerModal(ngo)}>
                          <i className="bi bi-hand-thumbs-up me-1" /> I want to help
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}

      {/* Volunteer interest modal */}
      <Modal show={!!volunteerNgo} onHide={() => setVolunteerNgo(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>I want to help — {volunteerNgo?.name}</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleVolunteerSubmit}>
          <Modal.Body>
            {volunteerStatus === 'success' && <Alert variant="success">Thank you! The NGO will get in touch with you.</Alert>}
            {volunteerStatus === 'error' && <Alert variant="danger">Something went wrong. Please try again.</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Your email</Form.Label>
              <Form.Control type="email" value={volunteerEmail} onChange={(e) => setVolunteerEmail(e.target.value)} required placeholder="your@email.com" />
            </Form.Group>
            <Form.Group className="mb-0">
              <Form.Label>Message (how you can help)</Form.Label>
              <Form.Control as="textarea" rows={3} value={volunteerMessage} onChange={(e) => setVolunteerMessage(e.target.value)} required placeholder="Brief message to the NGO..." />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setVolunteerNgo(null)}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={volunteerSubmitting}>
              {volunteerSubmitting ? 'Sending...' : 'Send'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Container>
  );
};

export default Search;
