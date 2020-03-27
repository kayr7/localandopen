import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import update from 'immutability-helper';
import VendorCard from './VendorCard';
import Alert from 'react-bootstrap/Alert';
import {getSession, getUserId} from './Session.js';

class App extends React.Component {
  render () {
    return (
      <div>
        <ShopInput />
      </div>
    );
  }
}

class ShopInput extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      input: {
        name: '',
        offering: '',
        description: '',
        onlineshop: 0,
        delivery: 0,
        mail_order: 0,
        voucher: 0,
        website: '',
        mail: '',
        phone: '',
        address: '',
        street: '',
        street_nr: '',
        zip: '',
        city: '',
        country: '',
        acceptance: 0,
        user_id: 1,
      },
      lastSubmit: {
        name: '',
        offering: '',
        description: '',
        onlineshop: 0,
        delivery: 0,
        mail_order: 0,
        voucher: 0,
        website: '',
        mail: '',
        phone: '',
        address: '',
        street: '',
        street_nr: '',
        zip: '',
        city: '',
        country: '',
        acceptance: 0,
        user_id: 1,
      },
      offerings: [],
      alert: '',
      token: '',
      success: false,
    };

    this.handleSubmit = this.handleSubmit.bind (this);

    this.handleNameUpdate = this.handleNameUpdate.bind (this);
    this.handleOfferingUpdate = this.handleOfferingUpdate.bind (this);
    this.handleDescriptionUpdate = this.handleDescriptionUpdate.bind (this);
    this.handleOnlineshopUpdate = this.handleOnlineshopUpdate.bind (this);
    this.handleDeliveryUpdate = this.handleDeliveryUpdate.bind (this);
    this.handleMailOrderUpdate = this.handleMailOrderUpdate.bind (this);
    this.handleVoucherUpdate = this.handleVoucherUpdate.bind (this);
    this.handleWebsiteUpdate = this.handleWebsiteUpdate.bind (this);
    this.handleMailUpdate = this.handleMailUpdate.bind (this);
    this.handlePhoneUpdate = this.handlePhoneUpdate.bind (this);
    this.handleAddressUpdate = this.handleAddressUpdate.bind (this);
    this.handleStreetUpdate = this.handleStreetUpdate.bind (this);
    this.handleStreetNrUpdate = this.handleStreetNrUpdate.bind (this);
    this.handleZipUpdate = this.handleZipUpdate.bind (this);
    this.handleCityUpdate = this.handleCityUpdate.bind (this);
    this.handleCountryUpdate = this.handleCountryUpdate.bind (this);
    this.handleAcceptanceUpdate = this.handleAcceptanceUpdate.bind (this);
  }

  handleNameUpdate (event) {
    this.setState ({
      input: update (this.state.input, {name: {$set: event.target.value}}),
    });
  }
  handleOfferingUpdate (event) {
    this.setState ({
      input: update (this.state.input, {offering: {$set: event.target.value}}),
    });
  }
  handleDescriptionUpdate (event) {
    this.setState ({
      input: update (this.state.input, {
        description: {$set: event.target.value},
      }),
    });
  }
  handleOnlineshopUpdate (event) {
    this.setState ({
      input: update (this.state.input, {
        onlineshop: {$set: event.target.checked ? 1 : 0},
      }),
    });
  }
  handleDeliveryUpdate (event) {
    this.setState ({
      input: update (this.state.input, {
        delivery: {$set: event.target.checked ? 1 : 0},
      }),
    });
  }
  handleMailOrderUpdate (event) {
    this.setState ({
      input: update (this.state.input, {
        mail_order: {$set: event.target.checked ? 1 : 0},
      }),
    });
  }
  handleVoucherUpdate (event) {
    this.setState ({
      input: update (this.state.input, {
        voucher: {$set: event.target.checked ? 1 : 0},
      }),
    });
  }
  handleWebsiteUpdate (event) {
    this.setState ({
      input: update (this.state.input, {website: {$set: event.target.value}}),
    });
  }
  handleMailUpdate (event) {
    this.setState ({
      input: update (this.state.input, {mail: {$set: event.target.value}}),
    });
  }
  handlePhoneUpdate (event) {
    this.setState ({
      input: update (this.state.input, {phone: {$set: event.target.value}}),
    });
  }
  handleAddressUpdate (event) {
    this.setState ({
      input: update (this.state.input, {address: {$set: event.target.value}}),
    });
  }
  handleStreetUpdate (event) {
    this.setState ({
      input: update (this.state.input, {street: {$set: event.target.value}}),
    });
  }
  handleStreetNrUpdate (event) {
    this.setState ({
      input: update (this.state.input, {street_nr: {$set: event.target.value}}),
    });
  }
  handleZipUpdate (event) {
    this.setState ({
      input: update (this.state.input, {zip: {$set: event.target.value}}),
    });
  }
  handleCityUpdate (event) {
    this.setState ({
      input: update (this.state.input, {city: {$set: event.target.value}}),
    });
  }
  handleCountryUpdate (event) {
    this.setState ({
      input: update (this.state.input, {country: {$set: event.target.value}}),
    });
  }
  handleAcceptanceUpdate (event) {
    this.setState ({
      input: update (this.state.input, {
        acceptance: {$set: event.target.checked ? 1 : 0},
      }),
    });
  }

  async handleSubmit (event) {
    window.scrollTo (0, 0);

    if (
      this.state.input.name === this.state.lastSubmit.name &&
      this.state.input.offering === this.state.lastSubmit.offering &&
      this.state.input.description === this.state.lastSubmit.description &&
      this.state.input.onlineshop === this.state.lastSubmit.onlineshop &&
      this.state.input.delivery === this.state.lastSubmit.delivery &&
      this.state.input.mail_order === this.state.lastSubmit.mail_order &&
      this.state.input.voucher === this.state.lastSubmit.voucher &&
      this.state.input.website === this.state.lastSubmit.website &&
      this.state.input.mail === this.state.lastSubmit.mail &&
      this.state.input.phone === this.state.lastSubmit.phone &&
      this.state.input.address === this.state.lastSubmit.address &&
      this.state.input.street === this.state.lastSubmit.street &&
      this.state.input.street_nr === this.state.lastSubmit.street_nr &&
      this.state.input.zip === this.state.lastSubmit.zip &&
      this.state.input.city === this.state.lastSubmit.city &&
      this.state.input.country === this.state.lastSubmit.country &&
      this.state.input.acceptance === this.state.lastSubmit.acceptance &&
      this.state.input.user_id === this.state.lastSubmit.user_id
    ) {
      this.setState ({alert: 'Die Daten wurden bereits übermittelt'});
      this.setState ({success: false});
      event.preventDefault ();
    } else if (this.state.input.acceptance === 0) {
      event.preventDefault ();
    } else {
      let submitValue = JSON.stringify (this.state.input);
      fetch (global.config.api + '/vendors/new', {
        // we need a test for duplicates in db!
        method: 'POST',
        //        mode: 'no-cors',
        headers: {
          Authorization: 'Bearer ' + this.state.token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Host: '192.168.8.4',
        },
        body: submitValue,
      })
        .then (resp => resp.json ())
        .then (dat => {
          if (dat.status === false) {
            console.log (dat);
            this.setState ({alert: dat.message});
            this.setState ({success: false});
          } else {
            this.setState ({alert: ''});
            this.setState ({success: true});
            this.state.lastSubmit.name = this.state.input.name;
            this.state.lastSubmit.offering = this.state.input.offering;
            this.state.lastSubmit.description = this.state.input.description;
            this.state.lastSubmit.onlineshop = this.state.input.onlineshop;
            this.state.lastSubmit.delivery = this.state.input.delivery;
            this.state.lastSubmit.mail_order = this.state.input.mail_order;
            this.state.lastSubmit.voucher = this.state.input.voucher;
            this.state.lastSubmit.website = this.state.input.website;
            this.state.lastSubmit.mail = this.state.input.mail;
            this.state.lastSubmit.phone = this.state.input.phone;
            this.state.lastSubmit.address = this.state.input.address;
            this.state.lastSubmit.street = this.state.input.street;
            this.state.lastSubmit.street_nr = this.state.input.street_nr;
            this.state.lastSubmit.zip = this.state.input.zip;
            this.state.lastSubmit.city = this.state.input.city;
            this.state.lastSubmit.country = this.state.input.country;
            this.state.lastSubmit.acceptance = this.state.input.acceptance;
            this.state.lastSubmit.user_id = this.state.input.user_id;
          }
        });
      event.preventDefault ();
    }
  }

  componentDidMount () {
    fetch (global.config.api + '/offerings', {
      headers: {'Content-Type': 'application/json'},
    })
      .then (result => result.json ())
      .then (dat => {
        this.setState ({offerings: dat.data.map (x => x.name)});
        this.setState ({
          input: update (this.state.input, {
            offering: {$set: dat.data[0].name},
          }),
        });
      });
    let t = getSession ();
    if (t) {
      this.setState ({token: t});
    }
    let x = getUserId ();
    this.setState ({
      input: update (this.state.input, {user_id: {$set: x.UserId}}),
    });
  }

  render () {
    let alert = '';
    if (this.state.alert !== '') {
      alert = (
        <Alert key="alert" variant="danger">
          {this.state.alert}
        </Alert>
      );
    } else {
      if (this.state.success) {
        alert = (
          <Alert key="alert" variant="success">
            "Ihr Angebot wurde erfolgreich aufgenommen"
          </Alert>
        );
      } else {
        alert = '';
      }
    }

    return (
      <div>
        {alert}
        <Card
          className="text-center"
          style={{
            background: 'linear-gradient(rgba(100,255,10,0.4),transparent)',
            backgroundColor: 'rgba(0,255,0,0.3)',
          }}
        >
          <Card.Header>
            <h1
              style={{
                fontFamily: "'Sofija', Helvetica, Arial, sans-serif",
              }}
            >
              Local and Open
            </h1>
            <h5
              style={{
                fontFamily: "'Sofija', Helvetica, Arial, sans-serif",
              }}
            >
              Neues Angebot eintragen
            </h5>

          </Card.Header>
          <Card.Body>
            <Card.Text>
              Bitte füllen Sie die folgenden Felder aus, damit wir Ihren Shop entsprechend listen können.
            </Card.Text>
          </Card.Body>
        </Card>

        <Row className="justify-content-md-center mt-4">
          <Col className="justify-content-md-center">
            <Row className="justify-content-md-center">
              <Card className="text-center" style={{width: '20rem'}}>
                <Card.Header as="h5">
                  <Form.Control
                    as="input"
                    type="text"
                    value={this.state.input.shopname}
                    onChange={this.handleNameUpdate}
                  />
                </Card.Header>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    <Form.Control
                      as="textarea"
                      onChange={this.handleDescriptionUpdate}
                      placeholder="Bitte eine kurze Beschreibung ihres Angebots eingeben"
                    />
                  </Card.Subtitle>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Form.Control
                        as="select"
                        id="offerselect"
                        defaultValue={this.state.offerings[0]}
                        onChange={this.handleOfferingUpdate}
                      >
                        {this.state.offerings.map ((o, y) => (
                          <option value={o} key={y}> {o} </option>
                        ))}
                      </Form.Control>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <Form.Check
                            type="checkbox"
                            value={this.state.input.onlineshop}
                            onChange={this.handleOnlineshopUpdate}
                            label="Onlineshop"
                          />
                        </Col>
                        <Col>
                          <Form.Check
                            type="checkbox"
                            value={this.state.input.voucher}
                            onChange={this.handleVoucherUpdate}
                            label="Gutscheine"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Check
                            type="checkbox"
                            value={this.state.input.delivery}
                            onChange={this.handleDeliveryUpdate}
                            label="Lieferung"
                          />
                        </Col>
                        <Col>
                          <Form.Check
                            type="checkbox"
                            value={this.state.input.mail_order}
                            onChange={this.handleMailOrderUpdate}
                            label="Versand"
                          />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Form.Control
                        as="input"
                        size="sm"
                        type="text"
                        placeholder="Webseite"
                        value={this.state.input.website}
                        onChange={this.handleWebsiteUpdate}
                      />
                      <Form.Control
                        as="input"
                        size="sm"
                        type="text"
                        placeholder="E-Mail Adresse"
                        value={this.state.input.mail}
                        onChange={this.handleMailUpdate}
                      />
                      <Form.Control
                        as="input"
                        size="sm"
                        type="text"
                        placeholder="Telefonnummer"
                        value={this.state.input.phone}
                        onChange={this.handlePhoneUpdate}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Form.Control
                        as="input"
                        size="sm"
                        type="text"
                        placeholder="Anschrift"
                        value={this.state.input.address}
                        onChange={this.handleAddressUpdate}
                      />
                      <Row>
                        <Col xs={8}>
                          <Form.Control
                            as="input"
                            size="sm"
                            type="text"
                            placeholder="Strasse"
                            value={this.state.input.street}
                            onChange={this.handleStreetUpdate}
                          />
                        </Col>
                        <Col>
                          <Form.Control
                            as="input"
                            size="sm"
                            type="numeric"
                            placeholder="Nr."
                            value={this.state.input.street_nr}
                            onChange={this.handleStreetNrUpdate}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Control
                            as="input"
                            size="sm"
                            type="text"
                            placeholder="12345"
                            value={this.state.input.zip}
                            onChange={this.handleZipUpdate}
                          />
                        </Col>
                        <Col xs={8}>
                          <Form.Control
                            as="input"
                            size="sm"
                            type="text"
                            placeholder="Stadt"
                            value={this.state.input.city}
                            onChange={this.handleCityUpdate}
                          />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Form.Check
                        type="checkbox"
                        value={this.state.input.acceptance}
                        label="Hiermit bestätigen Sie, dass Sie berechtigt sind,
                          die hier angegebenen Daten zur Verfügung zu stellen
                          und der Speicherung der Daten gemäß unserer
                          Datenschutzerklärung zustimmen."
                        onChange={this.handleAcceptanceUpdate}
                      />
                    </ListGroup.Item>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={this.handleSubmit}
                    >
                      {' '}Aufnehmen{' '}
                    </Button>

                  </ListGroup>
                </Card.Body>
              </Card>
            </Row>
          </Col>
          <Col>
            <Row className="justify-content-md-center">
              <h5> Vorschau: </h5>
            </Row>
            <Row className="justify-content-md-center">
              <VendorCard
                name={this.state.input.name}
                description={this.state.input.description}
                delivery={this.state.input.delivery}
                voucher={this.state.input.voucher}
                mail_order={this.state.input.mail_order}
                onlineshop={this.state.input.onlineshop}
                website={this.state.input.website}
                mail={this.state.input.mail}
                phone={this.state.input.phone}
                address={this.state.input.address}
                street={this.state.input.street}
                street_nr={this.state.input.street_nr}
                zip={this.state.input.zip}
                city={this.state.input.city}
                country={this.state.input.country}
              />
            </Row>

          </Col>

        </Row>

      </div>
    );
  }
}
export default App;
