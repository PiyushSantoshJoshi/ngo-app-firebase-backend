import React, { useState } from 'react';
import { Container, Navbar as BootstrapNavbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import CustomLink from './CustomLink';

const Navbar = () => {
  const { isAuthenticated, user, isAdmin, isNgo, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
    setExpanded(false);
  };

  const closeNavbar = () => setExpanded(false);

  return (
    <BootstrapNavbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" onClick={closeNavbar}>
          NGO Community
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={CustomLink} to="/" onClick={closeNavbar}>
              Home
            </Nav.Link>
            
            <Nav.Link as={CustomLink} to="/search" onClick={closeNavbar}>
              Search NGOs
            </Nav.Link>
            
            <Nav.Link as={CustomLink} to="/requirements" onClick={closeNavbar}>
              Requirements
            </Nav.Link>
            
            {isAdmin && (
              <Nav.Link as={CustomLink} to="/admin" onClick={closeNavbar}>
                Admin Dashboard
              </Nav.Link>
            )}
            {isNgo && (
                    <Nav.Link as={Link} to="/ngo/requirements" onClick={closeNavbar}>
                      NGO Requirements
                    </Nav.Link>
                  )}
            {isNgo && (
                    <Nav.Link as={Link} to="/ngo-dashboard" onClick={closeNavbar}>
                      NGO Dashboard
                    </Nav.Link>
                  )}
            {isAuthenticated && (
              <Nav.Link as={CustomLink} to="/messages" onClick={closeNavbar}>
                Messages
              </Nav.Link>
            )}
          </Nav>
          
          <Nav>
            {!isAuthenticated ? (
              <>
                <Nav.Link as={CustomLink} to="/login" onClick={closeNavbar}>
                  Login
                </Nav.Link>
                <Nav.Link as={CustomLink} to="/register" onClick={closeNavbar}>
                  Register
                </Nav.Link>
                <Nav.Link as={CustomLink} to="/ngo-register" onClick={closeNavbar}>
                  NGO Registration
                </Nav.Link>
              </>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                  {user?.email}
                </Dropdown.Toggle>
                
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile" onClick={closeNavbar}>
                    Profile
                  </Dropdown.Item>
                  
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;