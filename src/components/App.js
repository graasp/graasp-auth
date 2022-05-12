import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { HOME_PATH, SIGN_UP_PATH, buildSignInPath } from '../config/paths';
import Redirection from './Redirection';
import SignIn from './SignIn';
import SignUp from './SignUp';

const App = () => (
  <Router>
    <Redirection>
      <Routes>
        <Route path={buildSignInPath()} element={<SignIn />} />
        <Route path={SIGN_UP_PATH} exact element={<SignUp />} />
        <Route path={HOME_PATH} element={<SignIn />} />
      </Routes>
    </Redirection>
  </Router>
);

export default App;
