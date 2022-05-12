import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import { SIGN_UP_PATH, buildSignInPath, HOME_PATH } from '../config/paths';
import SignIn from './SignIn';
import Redirection from './Redirection';

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
