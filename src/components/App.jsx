import React, { Component, Fragment } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './common/PrivateRoute';
import ApplicationNavbar from './layout/ApplicationNavbar';

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alert from './layout/Alert';

import 'bulma/css/bulma.min.css';

import Container from './layout/Container';
import Footer from './layout/Footer';
import HomePage from './layout/HomePage';
import LoginChoice from './accounts/LoginChoice';
import LoginForm from './accounts/LoginForm';
import RegistrationForm from './accounts/RegistrationForm';
import Dashboard from './dashboard/Dashboard';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faEnvelope, faLock, faPlus } from '@fortawesome/free-solid-svg-icons';

import { setLocale } from 'yup';


const icons = [faHeart, faEnvelope, faLock, faPlus];
library.add(icons);


const alertOptions = {
  timeout: 3000,
  position: 'top center',
  offset: '30px',
};


setLocale({
  mixed: {
      // eslint-disable-next-line
      required: 'Il campo deve essere compilato.',
  },
  string: {
    // eslint-disable-next-line
    min: 'Il campo deve contenere almeno ${min} caratteri.',
    // eslint-disable-next-line
    max: 'Il campo può contenere al massimo ${max} caratteri.',
  },
});


class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <ApplicationNavbar />
              <Alert />
              <Container>
                <Switch>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/login-choice" exact component={LoginChoice} />
                  <Route path="/login/:loginType(patient-login|doctor-login)" exact component={LoginForm} />
                  <Route path="/register" exact component={RegistrationForm} />
                  <PrivateRoute path="/dashboard" component={Dashboard} />
                </Switch>
              </Container>
              <Footer />
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
