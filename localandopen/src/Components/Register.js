import React, {Component} from 'react';

import {Redirect} from 'react-router-dom';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {getSession, setSession} from './Session.js';

class Register extends Component {
  constructor (props) {
    super (props);
    this.state = {
      email: '',
      password: '',
      alert: '',
      redirectToStart: false,
      registered: '',
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind (this);
    this.handleRegSubmit = this.handleRegSubmit.bind (this);
    this.handleEmailUpdate = this.handleEmailUpdate.bind (this);
    this.handlePasswordUpdate = this.handlePasswordUpdate.bind (this);
  }

  async handleRegSubmit (event) {
    let submitv = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log (submitv);
    console.log (this.state);
    let submitValue = JSON.stringify (submitv);
    fetch (global.config.api + '/user/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: submitValue,
    })
      .then (resp => resp.json ())
      .then (dat => {
        if (dat.status === false) {
          this.setState ({alert: dat.message, registered: ''});
        } else {
          this.setState ({
            alert: '',
            registered: 'Sie können sich nun einloggen',
          });
        }
      });
    event.preventDefault ();
  }

  async handleLoginSubmit (event) {
    let submitv = {
      email: this.state.email,
      password: this.state.password,
    };
    let submitValue = JSON.stringify (submitv);
    fetch (global.config.api + '/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: submitValue,
    })
      .then (resp => resp.json ())
      .then (dat => {
        console.log (dat);
        if (dat.status === false) {
          this.setState ({alert: dat.message});
        } else {
          setSession (dat.account.token);
          this.setState (
            {alert: '', loggedin: true},
            window.location.reload ()
          );
        }
      });
    event.preventDefault ();
  }

  handlePasswordUpdate (event) {
    console.log (event.target.value);
    this.setState ({
      password: event.target.value,
    });
    console.log (this.state);
  }

  handleEmailUpdate (event) {
    console.log (event.target.value);
    this.setState ({
      email: event.target.value,
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
      alert = '';
    }
    let regalert = '';
    if (this.state.registered !== '') {
      regalert = (
        <Alert key="alert" variant="success">
          {this.state.registered}
        </Alert>
      );
    } else {
      regalert = '';
    }

    const redirectToStart = this.state.redirectToStart;
    if (redirectToStart === true) {
      return <Redirect to="/" />;
    }
    let t = getSession ();
    let forward = t ? <Redirect to="/add" /> : '';
    return (
      <div>
        {forward}
        {alert}
        {regalert}
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
            <h1>Local and Open</h1>

          </Card.Header>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              Um neue Angebote einzustellen müssen sie eingeloggt sein bzw. sich zuerst registrieren.
            </Card.Subtitle>
            <Card.Text />
            <Container>
              <div>
                <ul>
                  <li>Dies ist und bleibt kostenlos</li>
                  <li>
                    Ein Login ist nötig um Missbrauch der Webseite zu verhindern
                  </li>
                </ul>
                Bei Fragen, zögern Sie bitte nicht sich mit uns in
                {' '}
                <a href="mailto:anbieter@localandopen.de">Verbindung</a>
                {' '}
                zu setzen.
                {' '}
              </div>
            </Container>
          </Card.Body>
        </Card>
        <Row className="justify-content-md-center mt-4">
          <Card className="text-center" style={{width: '18rem'}}>
            <Card.Header as="h5">Login / Register</Card.Header>
            <Card.Body>
              <Form>

                <Card.Subtitle className="mb-2 text-muted">
                  Bitte Zugangsdaten eingeben oder neu registrieren
                </Card.Subtitle>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="email"
                        aria-label="email"
                        aria-describedby="basic-addon1"
                        onChange={this.handleEmailUpdate}
                      />
                    </InputGroup>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <InputGroup className="mb-3">
                      <FormControl
                        type="password"
                        placeholder="Passwort"
                        onChange={this.handlePasswordUpdate}
                      />
                    </InputGroup>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button variant="primary" onClick={this.handleLoginSubmit}>
                      Login
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {' '}
                    Click auf Registrieren legt automatisch Account mit eingegebenen Passwort an.
                    {' '}
                    <Button variant="secondary" onClick={this.handleRegSubmit}>
                      Registrieren
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </div>
    );
  }
}
export default Register;
