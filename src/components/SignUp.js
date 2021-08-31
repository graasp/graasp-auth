import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Qs from 'qs';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import { buildSignInPath } from '../config/paths';
import { getCurrentMember, signUp } from '../actions/authentication';
import { emailValidator, nameValidator } from '../utils/validation';
import {
  EMAIL_SIGN_UP_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
  SIGN_UP_BUTTON_ID,
} from '../config/selectors';
import { FORM_INPUT_MIN_WIDTH, GRAASP_COMPOSE_HOST } from '../config/constants';

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

class SignUp extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      fullScreen: PropTypes.string.isRequired,
      divider: PropTypes.string.isRequired,
      input: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      location: PropTypes.shape({
        search: PropTypes.string,
      }).isRequired,
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    name: '',
    emailError: '',
    nameError: '',
    error: false,
  };

  async componentDidMount() {
    this.setState({ isAuthenticated: Boolean(await getCurrentMember()) });
    this.checkIsAuthenticated();
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

  handleEmailOnChange = (e) => {
    const { error } = this.state;
    const email = e.target.value;
    this.setState({ email });
    if (error) {
      this.setState({ emailError: emailValidator(email) });
    }
  };

  handleNameOnChange = (e) => {
    const { error } = this.state;
    const name = e.target.value;
    this.setState({ name });
    if (error) {
      this.setState({ nameError: nameValidator(name) });
    }
  };

  handleRegister = async () => {
    const { email, name } = this.state;
    const lowercaseEmail = email.toLowerCase()
    
    const checkingEmail = emailValidator(lowercaseEmail);
    const checkingUsername = nameValidator(name);
    if (checkingEmail || checkingUsername) {
      this.setState({
        emailError: checkingEmail,
        nameError: checkingUsername,
        error: true,
      });
    } else {
      await signUp({ name, email: lowercaseEmail });
    }
  };

  renderForm = () => {
    const { classes, t } = this.props;
    const { email, name, emailError, nameError } = this.state;

    return (
      <>
        <FormControl>
          <TextField
            className={classes.input}
            required
            label={t('Name')}
            variant="outlined"
            value={name}
            error={Boolean(nameError)}
            helperText={nameError}
            onChange={this.handleNameOnChange}
            id={NAME_SIGN_UP_FIELD_ID}
          />
          <TextField
            className={classes.input}
            required
            label={t('Email')}
            variant="outlined"
            value={email}
            error={Boolean(emailError)}
            helperText={emailError}
            onChange={this.handleEmailOnChange}
            id={EMAIL_SIGN_UP_FIELD_ID}
            type="email"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleRegister}
            id={SIGN_UP_BUTTON_ID}
            fullWidth
          >
            {t('Sign Up')}
          </Button>
        </FormControl>

        <Divider variant="middle" className={classes.divider} />
        <Link to={buildSignInPath()}>
          {t('Already have an account? Click here to sign in')}
        </Link>
      </>
    );
  };

  render() {
    const { classes, t } = this.props;

    return (
      <div className={classes.fullScreen}>
        <Typography variant="h2" component="h2">
          {t('Sign Up')}
        </Typography>
        {this.renderForm()}
      </div>
    );
  }
}

const StyledComponent = withStyles(styles, { withTheme: true })(SignUp);
const TranslatedComponent = withTranslation()(StyledComponent);
export default withRouter(TranslatedComponent);
