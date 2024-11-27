import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
