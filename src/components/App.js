import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './SignUp';
import { SIGN_UP_PATH, buildSignInPath } from '../config/paths';
import SignIn from './SignIn';

const App = () => (
  <Router>
    <Switch>
      <Route path={buildSignInPath()} component={SignIn} />
      <Route path={SIGN_UP_PATH} exact component={SignUp} />
    </Switch>
  </Router>
);

export default App;
