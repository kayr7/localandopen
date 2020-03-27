import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Navigation from './Navigation';
import Shopview from './Shopview';
import App from './App';
import Error from './Error';
import Impressum from './Impressum';
import Dataprotection from './Dataprotection';
import Register from './Register.js';
import AboutUs from './AboutUs.js';
import {getSession} from './Session.js';
import CookieConsent from 'react-cookie-consent';

class Main extends Component {
  render () {
    return (
      <BrowserRouter>
        <CookieConsent buttonText="Einverstanden">
          Diese Webseite benutzt Cookies für die Funktionalität
        </CookieConsent>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" component={Shopview} exact />
            <Route
              path="/add"
              render={() =>
                getSession () ? <App to="/add" /> : <Redirect to="/" />}
            />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/impressum" component={Impressum} />
            <Route path="/dataprotection" component={Dataprotection} />
            <Route path="/register" component={Register} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
