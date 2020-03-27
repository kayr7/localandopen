import React, {Component} from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import {getSession, logOut} from './Session.js';

class Navigation extends Component {
  constructor (props) {
    super (props);
    this.state = {
      email: '',
      password: '',
      alert: '',
      loggedin: false,
    };
    this.handleLogoutSubmit = this.handleLogoutSubmit.bind (this);
  }

  async handleLogoutSubmit (event) {
    logOut ();
    this.setState ({alert: '', loggedin: false}, window.location.reload ());
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
    let loggedin = getSession ()
      ? <Nav className="ml-auto" variant="pills">
          <Nav.Link href="/add">Neues Angebot</Nav.Link>
          <Button type="submit" onClick={this.handleLogoutSubmit}>
            logout
          </Button>
        </Nav>
      : <Nav className="ml-auto" variant="pills">
          <Nav.Link href="/register">Neues Angebot</Nav.Link>
        </Nav>;

    return (
      <Navbar bg="light" expand="lg">
        <Nav className="mr-auto" variant="pills">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/aboutus">Über uns</Nav.Link>
          <Nav.Link href="/impressum">Impressum</Nav.Link>
          <Nav.Link href="/dataprotection">Datenschutz</Nav.Link>
        </Nav>
        {loggedin}
      </Navbar>
    );
  }
}

export default Navigation;
