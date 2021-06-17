import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Qs from 'qs';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { buildSignInPath } from '../config/paths';
import { getCurrentMember, signUp } from '../actions/authentication';
import { GRAASP_COMPOSE_HOST } from '../config/constants';
import { emailValidator, nameValidator } from '../utils/validation';
import {
  EMAIL_SIGN_UP_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
  SIGN_UP_BUTTON_ID,
} from '../config/selectors';

const styles = (theme) => ({
  fullScreen: {
    margin: 'auto',
    textAlign: 'center',
  },
  input: {
    margin: theme.spacing(1),
    width: '250px',
  },
  form: {
    width: '50%',
    minWidth: '250px',
    margin: 'auto',
  },
});

class SignUp extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      fullScreen: PropTypes.string.isRequired,
      form: PropTypes.string.isRequired,
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

  register = async () => {
    const { email, name } = this.state;
    const checkingEmail = emailValidator(email);
    const checkingUsername = nameValidator(name);
    if (checkingEmail === '' && checkingUsername === '') {
      signUp({ name, email });
    } else {
      this.setState({
        emailError: checkingEmail,
        nameError: checkingUsername,
        error: true,
      });
    }
  };

  renderForm = () => {
    const { classes, t } = this.props;
    const { email, name, emailError, nameError } = this.state;

    return (
      <>
        <Grid item xs={12}>
          <TextField
            className={classes.input}
            required
            label={t('Name')}
            variant="outlined"
            value={name}
            error={nameError !== ''}
            helperText={nameError}
            onChange={this.handleNameOnChange}
            id={NAME_SIGN_UP_FIELD_ID}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.input}
            required
            label={t('Email')}
            variant="outlined"
            value={email}
            error={emailError !== ''}
            helperText={emailError}
            onChange={this.handleEmailOnChange}
            id={EMAIL_SIGN_UP_FIELD_ID}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.register}
            id={SIGN_UP_BUTTON_ID}
          >
            {t('Sign Up')}
          </Button>
        </Grid>
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
        <Grid container className={classes.form} justify="center">
          {this.renderForm()}
        </Grid>
      </div>
    );
  }
}

const StyledComponent = withStyles(styles, { withTheme: true })(SignUp);
const TranslatedComponent = withTranslation()(StyledComponent);
export default withRouter(TranslatedComponent);
