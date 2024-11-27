import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, selectIsAuthenticated, selectUser } from '../features/auth/authSlice';

const Header = () => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); 
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            {/* Altri link se necessari */}
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {/* Dropdown per il menu Prodotti */}
            <NavDropdown title="Products" id="products-dropdown">
              {/* Link per la lista dei prodotti */}
              <NavDropdown.Item as={Link} to="/products">
                Lista Prodotti
              </NavDropdown.Item>
              {/* Link per aggiungere un nuovo prodotto */}
              <NavDropdown.Item as={Link} to="/add-product">
                Nuovo Prodotto
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/chart">
              Chart
            </Nav.Link>
          </Nav>

          <Nav className="ml-auto">
          {isAuthenticated ? (
            <>
              <span className="navbar-text text-white">Ciao, {user.username}</span>
              <Button variant="outline-light" onClick={handleLogout} className="ms-2">
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login" className="nav-link text-white">Login</Link>
          )}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
