import React from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  // Ottieni l'utente dalla sessione o dallo store Redux
  const user = useSelector((state) => state.user); // Supponiamo che il tuo stato Redux abbia un campo 'user'

  return (
    <Container>
      <Row className="my-4">
        <Col>
          {/* Benvenuto personalizzato */}
          <Card>
            <Card.Body>
              <Card.Title>
                {user ? `Benvenuto, ${user.username}!` : 'Benvenuto nella nostra App!'}
              </Card.Title>
              <Card.Text>
                {user ? (
                  `Ciao ${user.username}, esplora le funzionalità della nostra applicazione!`
                ) : (
                  'Esplora i prodotti e i servizi disponibili nel nostro sistema.'
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Card per le funzionalità dell'app */}
      <Row className="my-4">
      <Col md={4} className="p-2">
        <Card className="h-100 d-flex flex-column">
          <Card.Body className="d-flex flex-column">
            <Card.Title>Gestisci Prodotti</Card.Title>
            <Card.Text>
              Visualizza i prodotti disponibili nel sistema.
            </Card.Text>
            <div className="mt-auto">
              <Button variant="primary" as={Link} to="/products">
                Vai ai Prodotti
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>

        <Col md={4} className="p-2">
          <Card className='h-100 d-flex flex-column'>
            <Card.Body className='d-flex flex-column'>
              <Card.Title>Statistica</Card.Title>
              <Card.Text>
                Visualizza le statistiche dei prodotti per categoria.
              </Card.Text>
              <div className="mt-auto">
                <Button variant="primary" as={Link} to="/chart">
                  Vai alle Statistiche
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="p-2">
          <Card className='h-100 d-flex flex-column'>
            <Card.Body className='d-flex flex-column'>
              <Card.Title>Impostazioni</Card.Title>
              <Card.Text>
                Personalizza le impostazioni dell'account.
              </Card.Text>
              <div className="mt-auto">
                <Button variant="primary" as={Link} to="/settings" >
                  Vai alle Impostazioni
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
