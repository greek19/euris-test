import React from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {CARD_DETAILS} from '../utility/constants'
import PropTypes from 'prop-types';

const CardItem = ({ title, text, link, buttonText, disabled }) => (
  <Col md={4} className="p-2">
    <Card className="h-100 d-flex flex-column">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <div className="mt-auto">
          {disabled ? 
            <Button variant="primary" to={link} disabled={disabled}>
            {buttonText}
            </Button>
            :
            <Button variant="primary" as={Link} to={link} disabled={disabled}>
              {buttonText}
            </Button>
          }
        </div>
      </Card.Body>
    </Card>
  </Col>
);

CardItem.propTypes = {
  title: PropTypes.string,
  text:  PropTypes.string,
  link: PropTypes.string,
  buttonText:  PropTypes.string,
  disabled:  PropTypes.bool
}

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Container>
      <Row className="my-4">
        <Col className="p-2">
          <Card>
            <Card.Body>
              <Card.Title id="home-card-title-1">Benvenuto, {user?.username}!</Card.Title>
              <Card.Text>
                Ciao {user?.username}, esplora le funzionalità dell'app utilizzando i link nelle card in basso!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="my-4">
        {CARD_DETAILS.map((card, index) => (
          <CardItem
            key={"cardItem-"+index}
            title={card.title}
            text={card.text}
            link={card.link}
            buttonText={card.buttonText}
            disabled={card.disabled}
          />
        ))}
      </Row>
    </Container>
  );
};

export default Home;
