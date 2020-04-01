import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import VendorCard from './VendorCard';
import '../config.js';

class ShopView extends React.Component {
  render () {
    return (
      <div>
        <Card
          className="text-center"
          style={{
            background: 'linear-gradient(rgba(100,255,10,0.4),transparent)',
            backgroundColor: 'rgba(0,255,0,0.3)',
          }}
        >
          <Card.Header
            style={{
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
              <div>
                <ul>
                  <li>
                    Helfen Sie ihren lokalen Anbietern und bestellen Sie dort anstelle bei großen Versandhändlern
                  </li>
                  <li>
                    Kaufen Sie schon jetzt Gutscheine für Ihre Lieblingsrestaurants, damit sie auch in Zukunft dort noch essen können
                  </li>
                </ul>
                Diese Seite ist und bleibt kostenlos! Helfen Sie mit und stellen Sie auch Ihr
                {' '}
                <Button size="sm" href="/register">Angebot</Button>
                {' '}
                ein.
                <p />
              </div>
            </Container>
          </Card.Body>
        </Card>
        <ShopList className="mt-4" />
      </div>
    );
  }
}

class ShopList extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      offerings: [],
      zip: '',
      offset: 0,
      offering: '',
      vendors: [],
    };

    this.handleOfferingUpdate = this.handleOfferingUpdate.bind (this);
    this.handleZipUpdate = this.handleZipUpdate.bind (this);
    this.updateVendorList = this.updateVendorList.bind (this);
  }

  updateVendorList (offering, zip, offset) {
    fetch (
      global.config.api +
        '/vendors?' +
        new URLSearchParams ({
          offering: offering,
          zip: zip,
          offset: offset,
        }),
      {
        headers: {'Content-Type': 'application/json'},
      }
    )
      .then (result => result.json ())
      .then (dat => {
        this.setState ({vendors: dat.data});
      });
  }

  handleOfferingUpdate (event) {
    if (event.target.value === '---') {
      this.setState (
        {
          offering: '',
        },
        this.updateVendorList ('', this.state.zip, this.state.offset)
      );
    } else {
      this.setState (
        {
          offering: event.target.value,
        },
        this.updateVendorList (
          event.target.value,
          this.state.zip,
          this.state.offset
        )
      );
    }
  }

  handleZipUpdate (event) {
    this.setState (
      {
        zip: event.target.value,
      },
      this.updateVendorList (
        this.state.offering,
        event.target.value,
        this.state.offset
      )
    );
  }

  componentDidMount () {
    fetch (global.config.api + '/offerings', {
      headers: {'Content-Type': 'application/json'},
    })
      .then (result => result.json ())
      .then (dat => {
        this.setState ({offerings: dat.data.map (x => x.name)});
      });

    fetch (global.config.api + '/vendors', {
      headers: {'Content-Type': 'application/json'},
    })
      .then (result => result.json ())
      .then (dat => {
        this.setState ({vendors: dat.data});
      });
  }

  render () {
    return (
      <Container fluid>
        <Row className="mt-4 ml-4 mr-4">
          Suchen:
          <Col>
            <Form.Control
              as="select"
              id="offerselect"
              onChange={this.handleOfferingUpdate}
            >
              <option value="---" key="---"> --- </option>
              {this.state.offerings.map ((o, y) => (
                <option value={o} key={y}> {o} </option>
              ))}
            </Form.Control>
          </Col>
          <Col>
            <Form.Control
              as="input"
              type="text"
              placeholder="PLZ"
              value={this.state.zip}
              onChange={this.handleZipUpdate}
            />
          </Col>
        </Row>
        <p />

        <Row>
          {this.state.vendors.map ((vendor, o) => (
            <VendorCard
              key={o}
              name={vendor.name}
              description={vendor.description}
              delivery={vendor.delivery}
              voucher={vendor.voucher}
              mail_order={vendor.mail_order}
              onlineshop={vendor.onlineshop}
              website={vendor.website}
              pickup={vendor.pickup === null ? 1 : vendor.pickup}
              mail={vendor.mail}
              phone={vendor.phone}
              address={vendor.address}
              street={vendor.street}
              street_nr={vendor.street_nr}
              zip={vendor.zip}
              city={vendor.city}
              country={vendor.country}
            />
          ))}
        </Row>
        <Row>
          <Card className="text-center" style={{width: '20rem', margin: '1em'}}>
            <Card.Header as="h5">Nicht gefunden was Sie suchen?</Card.Header>
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">
                Helfen Sie mit und erzählen Ihren Unternehmen in der Umgebung von uns.
                Je mehr Unternehmen hier gefunden werden, je mehr können unsere lokalen Unternehmen unterstützt werden.
                Oder stellen Sie gleich Ihr eigenes Unternehmen ein.
              </Card.Subtitle>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col sm={12}>
                      <Button size="sm" href="/register">Angebot</Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}
export default ShopView;
