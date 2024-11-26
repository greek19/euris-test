import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Welcome to My App</Card.Title>
        <Card.Text>
          This is the home page. Explore our products and services!
        </Card.Text>
        <Button variant="primary" href="/products">
          Go to Products
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Home;
