import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import '../config.js';

class AboutUs extends React.Component {
  render () {
    return (
      <div>
        <Card className="text-center">
          <Card.Header
            style={{
              background: 'linear-gradient(rgba(100,255,10,0.4),transparent)',
              backgroundColor: 'rgba(0,255,0,0.3)',
              fontFamily: "'Sofija', Helvetica, Arial, sans-serif",
            }}
          >
            <h1> Local and Open </h1>
            <h4
              style={{
                fontFamily: "'Sofija', Helvetica, Arial, sans-serif",
              }}
            >
              Unterstütze deine Unternehmen um die Ecke{' '}
            </h4>
          </Card.Header>
          <Card.Body>
            <Container>
              <Row>
                <Col className="ml-auto">
                  <img
                    className="rund"
                    width="200px"
                    height="200px"
                    src="./Christina.jpg"
                    alt="placehold"
                  />
                </Col>
                <Col className="mr-auto">
                  <img
                    className="rund"
                    width="200px"
                    height="200px"
                    src="./Kay.jpg"
                    alt="placehold"
                  />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  Wir sind der festen Überzeugung dass es wichtig ist lokale Unternehmen zu unterstützen,
                  gerade in schweren Zeiten, um so auch in Zukunft noch persönliche Beratung, diverse Innenstädte
                  und lokale Arbeitsplätze zu haben.
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  {' '}
                  Anstelle auf große Versandhändler zurückzugreifen glauben wir, dass
                  {' '}
                  auch die kleinen Unternehmen von nebenan genauso gute Angebote haben und unterstützenswert sind.
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  Aus diesem Grund haben wir privat und kostenfrei diese Webseite gebaut.
                  Um kleinen Unternehmen eine Plattform zu geben,
                  und uns Kunden die Möglichkeit zu geben uns aktiv an unsere lokalen Anbieter zu wenden.
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  Christina & Kay
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>

      </div>
    );
  }
}

export default AboutUs;
