import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import logo from '../../assets/favicon.png'; 
import { ADD_PRODUCTS, CHART, LOGIN, PRODUCTS, ROOT } from '../../utility/routesConstants';
import { persistor } from '../../features/store';

const Header = () => {
  const user = useSelector((state)=> state.auth.user);
  const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); 
    persistor.purge();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={ROOT}>
          <img
            src={logo} 
            alt="My App"
            height="30" 
          />        
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link as={Link} to={ROOT}>
              Home
            </Nav.Link>
            <NavDropdown title="Prodotti" id="products-dropdown">
              <NavDropdown.Item as={Link} to={PRODUCTS}>
                Lista Prodotti
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={ADD_PRODUCTS}>
                Nuovo Prodotto
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to={CHART}>
              Statistiche
            </Nav.Link>
          </Nav>

          <Nav className="ml-auto">
          {isAuthenticated ? (
            <>
              <span className="navbar-text text-white">
              <i className="bi bi-person-circle p-2"></i>
              {user.username}</span>
              <Button variant="outline-light" onClick={handleLogout} className="ms-2">
                <i className="bi bi-box-arrow-right"></i> Logout
              </Button>
            </>
          ) : (
            <Link to={LOGIN} className="nav-link text-white">Login</Link>
          )}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
