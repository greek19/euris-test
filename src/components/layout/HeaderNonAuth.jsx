import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/favicon.png'
import { LOGIN, ROOT } from '../../utility/routesConstants';

const HeaderNonAuth = () => {
 
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
      <Navbar.Brand as={Link} to={ROOT}>
          <img
            src={logo} // Utilizza il logo importato
            alt="My App"
            height="30" // Imposta l'altezza dell'immagine (modificabile)
          />        
        </Navbar.Brand>        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link to={LOGIN} className="nav-link text-white">Login</Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderNonAuth;
