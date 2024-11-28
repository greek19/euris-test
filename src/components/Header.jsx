import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import logo from '../assets/favicon.png'; 

const Header = () => {
  const user = useSelector((state)=> state.auth.user);
  const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); 
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo} // Utilizza il logo importato
            alt="My App"
            height="30" // Imposta l'altezza dell'immagine (modificabile)
          />        
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            {/* Altri link se necessari */}
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {/* Dropdown per il menu Prodotti */}
            <NavDropdown title="Prodotti" id="products-dropdown">
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
            <Link to="/login" className="nav-link text-white">Login</Link>
          )}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
