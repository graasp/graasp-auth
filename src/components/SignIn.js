import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import Qs from 'qs';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import { Box } from '@material-ui/core';
import { SIGN_UP_PATH } from '../config/paths';
import {
  getCurrentMember,
  signIn,
  signInPassword,
} from '../actions/authentication';
import { emailValidator, passwordValidator } from '../utils/validation';
import {
  EMAIL_SIGN_IN_FIELD_ID,
  PASSWORD_SIGN_IN_BUTTON_ID,
  PASSWORD_SIGN_IN_FIELD_ID,
  SIGN_IN_BUTTON_ID,
} from '../config/selectors';
import { FORM_INPUT_MIN_WIDTH, GRAASP_COMPOSE_HOST } from '../config/constants';
import { SIGN_IN_ERROR } from '../types/member';
import notifier from '../utils/notifier';

const styles = (theme) => ({
  fullScreen: {
    margin: 'auto',
    textAlign: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: theme.spacing(1, 0),
    minWidth: FORM_INPUT_MIN_WIDTH,
  },
  divider: {
    margin: theme.spacing(2),
  },
});

class SignIn extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      fullScreen: PropTypes.string.isRequired,
      divider: PropTypes.string.isRequired,
      input: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      location: PropTypes.shape({ search: PropTypes.string }).isRequired,
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.shape({
        error: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    email: '',
    password: '',
    isAuthenticated: false,
    emailError: '',
    passwordError: '',
    error: false,
    signInMethod: true,
  };

  async componentDidMount() {
    this.setState({ isAuthenticated: Boolean(await getCurrentMember()) });
    this.checkIsAuthenticated();

    // read url and trigger error notification if backend couldn't authenticate
    const {
      location: { search },
    } = this.props;
    const { error } = Qs.parse(search, { ignoreQueryPrefix: true });
    if (error) {
      notifier.error({ code: SIGN_IN_ERROR });
    }
  }

  componentDidUpdate() {
    this.checkIsAuthenticated();
  }

  checkIsAuthenticated = () => {
    const {
      history: {
        location: { search },
      },
    } = this.props;
    const { isAuthenticated } = this.state;
    if (isAuthenticated) {
      const queryString = Qs.parse(search, { ignoreQueryPrefix: true });
      window.location.href = queryString?.to || GRAASP_COMPOSE_HOST;
    }
  };

  handleSignIn = async () => {
    const { email } = this.state;
    const lowercaseEmail = email.toLowerCase();

    const checkingEmail = emailValidator(lowercaseEmail);
    if (checkingEmail) {
      this.setState({ emailError: checkingEmail, error: true });
    } else {
      await signIn({ email: lowercaseEmail });
    }
  };

  handlePasswordSignIn = async () => {
    const { email } = this.state;
    const { password } = this.state;
    const lowercaseEmail = email.toLowerCase();
    /* eslint-disable no-console */
    const checkingEmail = emailValidator(lowercaseEmail);
    const checkingPassword = passwordValidator(password);
    if (checkingEmail || checkingPassword) {
      if (checkingEmail) {
        this.setState({ emailError: checkingEmail, error: true });
      }
      if (checkingPassword) {
        this.setState({ passwordError: checkingPassword, error: true });
      }
    } else {
      const link = await signInPassword({ email: lowercaseEmail, password });
      if (link) {
        window.location.href = link;
      }
    }
  };

  handleOnChange = (e) => {
    const { error } = this.state;
    const email = e.target.value;
    this.setState({ email });
    if (error) {
      this.setState({ emailError: emailValidator(email) });
    }
  };

  handleOnChangePassword = (e) => {
    const { error } = this.state;
    const password = e.target.value;
    this.setState({ password });
    if (error) {
      this.setState({ passwordError: passwordValidator(password) });
    }
  };

  handleKeypress = (e) => {
    const { signInMethod } = this.state;
    // signInMethod email when true
    // sign in by pressing the enter key
    if (e.key === 'Enter') {
      if (signInMethod) {
        this.handleSignIn();
      } else {
        this.handlePasswordSignIn();
      }
    }
  };

  handleSignInMethod = () => {
    const { signInMethod } = this.state;
    // signInMethod email when true
    if (signInMethod) {
      this.setState({ signInMethod: false });
    } else {
      this.setState({ signInMethod: true });
    }
  };

  renderSignInForm = () => {
    const { email, emailError } = this.state;
    const { password, passwordError } = this.state;
    const { signInMethod } = this.state;
    const { classes, t } = this.props;

    return (
      <>
        <FormControl>
          <TextField
            className={classes.input}
            required
            label={t('Email')}
            variant="outlined"
            value={email}
            error={emailError}
            helperText={emailError}
            onChange={this.handleOnChange}
            id={EMAIL_SIGN_IN_FIELD_ID}
            type="email"
            onKeyPress={this.handleKeypress}
          />
          {signInMethod === false && (
            <>
              <TextField
                className={classes.input}
                required
                label={t('Password')}
                variant="outlined"
                value={password}
                error={passwordError}
                helperText={passwordError}
                onChange={this.handleOnChangePassword}
                id={PASSWORD_SIGN_IN_FIELD_ID}
                type="password"
                onKeyPress={this.handleKeypress}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.handlePasswordSignIn}
                id={PASSWORD_SIGN_IN_BUTTON_ID}
              >
                {t('Sign In')}
              </Button>
            </>
          )}
          {signInMethod === true && (
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSignIn}
              id={SIGN_IN_BUTTON_ID}
            >
              {t('Sign In')}
            </Button>
          )}
        </FormControl>
        <Divider variant="middle" className={classes.divider} />
        <Link to={SIGN_UP_PATH}>
          {t('Not registered? Click here to register')}
        </Link>
      </>
    );
  };

  render() {
    const { classes, t } = this.props;
    const { signInMethod } = this.state;

    return (
      <div className={classes.fullScreen}>
        <Typography variant="h2" component="h2">
          {t('Sign In')}
        </Typography>
        {this.renderSignInForm()}
        <Divider variant="middle" className={classes.divider} />
        <Box sx={{ justifyContent: 'center' }}>
          <Button
            // variant="contained"
            color="primary"
            disabled={signInMethod}
            onClick={this.handleSignInMethod}
          >
            {t('Email Sign In')}
          </Button>
          <Button
            // variant="contained"
            color="primary"
            disabled={!signInMethod}
            onClick={this.handleSignInMethod}
          >
            {t('Password Sign In')}
          </Button>
        </Box>
      </div>
    );
  }
}

const StyledComponent = withStyles(styles, { withTheme: true })(SignIn);
const TranslatedComponent = withTranslation()(StyledComponent);
export default withRouter(TranslatedComponent);
