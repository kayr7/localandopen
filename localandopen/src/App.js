import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
import logo from './logo.svg';
import './App.css';

import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

var API = "127.0.0.1";


class App extends React.Component {
  render() {
    return (
      <div>
        <ShopInput></ShopInput>
      </div>

    )
  }  
}

class ShopInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentList: [],
      location: "",
      page: 0,
      shoptype: "",
      input: {shopname: "",
              shoptype: "",},
              website: "",
              mail: "",
              phone: "",
              addressname: "",
              street: "",
              number: "",
              plz: "",
              City: "",
              /*
              Zahlungsmethoden,*/
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    let submitValue ={
      shopname: this.state.input.shopname,
      shoptype: this.state.input.shoptype,
    };
    const response = await fetch(API + '/newShop', { // we need a test for duplicates in db!
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(submitValue),});
    await response.json();


    event.preventDefault();
  }


  componentDidMount() {
    fetch(API + '/data')
    .then(result => {
      return result.json();
    }).then(dat => {
      this.setState({measurements: dat});
    })
  }


  render() {
    return (
      <div>
        <Card  className="text-center">
        <Card.Header as="h5">Shop eintragen</Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">Aufnahme von ihrem Shop in die Datenbank</Card.Subtitle>
          <Card.Text>
            Bitte f&uuml;llen Sie die folgenden Felder aus, damit wir Ihren Shop entsprechend listen k&ouml;nnen.
        </Card.Text>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Row className="justify-content-md-center">
              <Col xs lg="2">
                <Form.Label>Gesch&auml;ftsname</Form.Label>
              </Col>
              <Col xs lg="1">
              </Col>
              <Col xs lg="4">
                <Form.Control as="input" type="text" value={this.state.input.shopname} />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs lg="2">
                <Form.Label>Branche</Form.Label>
              </Col>
              <Col xs lg="1">
              </Col>
              <Col xs lg="4">
                <Form.Control as="input" type="text" value={this.state.input.shoptype} />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs lg="2">
                <Form.Label>Kurzbeschreibung des Angebots</Form.Label>
              </Col>
              <Col xs lg="1">
              </Col>
              <Col xs lg="4">
                <Form.Control as="textarea" rows="3" />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs lg="2">
                <Form.Label>Onlineshop</Form.Label>
              </Col>
              <Col xs lg="1">
              </Col>
              <Col xs lg="4">
                <Form.Check type="checkbox" value={this.state.input.onlineshop} />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs lg="2">
                <Form.Label>Website</Form.Label>
              </Col>
              <Col xs lg="1">
              </Col>
              <Col xs lg="4">
                <Form.Control as="input" type="text" value={this.state.input.website} />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs lg="2">
                <Form.Label>e-Mail</Form.Label>
              </Col>
              <Col xs lg="1">
              </Col>
              <Col xs lg="4">
                <Form.Control as="input" type="text" value={this.state.input.mail} />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs lg="2">
                <Form.Label>Telefon</Form.Label>
              </Col>
              <Col xs lg="1">
              </Col>
              <Col xs lg="4">
                <Form.Control as="input" type="text" placeholder="012345678" value={this.state.input.phone} />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs lg="2">
                <Form.Label>Adresse</Form.Label>
              </Col>
              <Col xs lg="1">
              </Col>
              <Col xs lg="4">
                <Form.Control as="input" type="text" placeholder="012345678" value={this.state.input.phone} />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs lg="3">
                <Form.Label>Strasse, Hausnummer</Form.Label>
              </Col>
              <Col xs lg="3">
                <Form.Control as="input" type="text" placeholder="Bahnhofstrasse" value={this.state.input.phone} />
              </Col>
              <Col xs lg="1">
                <Form.Control as="input" type="text" placeholder="1" value={this.state.input.phone} />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs lg="2">
                <Form.Label>PLZ, Stadt</Form.Label>
              </Col>
              <Col xs lg="2">
                <Form.Control as="input" type="text" placeholder="12345" value={this.state.input.phone} />
                </Col>
                <Col xs lg="3">
                <Form.Control as="input" type="text" placeholder="B&auml;rstadt" value={this.state.input.phone} />
              </Col>
            </Row>

            <Row className="justify-content-md-center">            
              <Col xs lg="2">
              </Col>
              
              <Col xs lg="3">
              <Row className="justify-content-md-center">            
              <Col xs lg="35">
                <Form.Check type="checkbox" label="Hiermit stimmen Sie zu, dass Sie berechtigt sind, die hier angegebenen Daten zur Verfuegung zu stellen" />
              </Col>
            </Row>
              <Button as="input" type="submit" value="Submit" />{' '}
              </Col>
              
              <Col xs lg="2">
              </Col>
            </Row>

          </Form>
        </Container>
        </Card.Body>
      </Card>


      </div>

    )
  }  
}

export default App;
