import React from 'react';
import { Card, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Welcome to My App</Card.Title>
        <Card.Text>
          This is the home page. Explore our products and services!
        </Card.Text>
        <Button variant="primary">
          <Nav.Link as={Link} to="/products">Go to Products</Nav.Link>
        </Button>
        
      </Card.Body>
    </Card>
  );
};

export default Home;
