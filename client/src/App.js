import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';

import PrivateRoute from './components/common/PrivateRoute';

import {Provider}  from 'react-redux';
import store from './store';


import './App.scss';
import './style.css';

// Containers
import { DefaultLayout } from './containers';
// Pages
import { Landing, Login, Page404, Page500, Register,Email } from './views/Pages';


// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
  
    // Redirect to login
    window.location.href = '/login';
  }
}



class App extends Component {
  render() {
    return (
      <Provider store={store}>
         <BrowserRouter>
           <div className="App">
              <div className="">
                <Route exact path="/" name="Landing Page" component={Landing} />
                <Route exact path="/register" name="Register Page" component={Register} />
                <Route exact path="/login" name="Login Page" component={Login} />
                <Route exact path="/404" name="Page 404" component={Page404} />
                <Route exact path="/500" name="Page 500" component={Page500} />
                <Route exact path="/email" name="Page 500" component={Email} />
                  <Switch>
                      <PrivateRoute path="/main" name="Home" component={DefaultLayout} />
                  </Switch>
              </div>
            </div>  
      </BrowserRouter> 

      </Provider>
    );
  }
}

export default App;
