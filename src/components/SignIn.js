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
import { SIGN_UP_PATH } from '../config/paths';
import { getCurrentMember, signIn } from '../actions/authentication';
import { FIELD_WIDTH, GRAASP_COMPOSE_HOST } from '../config/constants';
import { emailValidator } from '../utils/validation';
import { EMAIL_SIGN_IN_FIELD_ID, SIGN_IN_BUTTON_ID } from '../config/selectors';

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
    margin: theme.spacing(1),
    width: FIELD_WIDTH,
  },
  form: {
    width: '50%',
    minWidth: FIELD_WIDTH,
    margin: 'auto',
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
      form: PropTypes.string.isRequired,
      input: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      location: PropTypes.shape({ search: PropTypes.string }).isRequired,
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    isAuthenticated: false,
    emailError: '',
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

  handleSignIn = async () => {
    const { email } = this.state;
    const checkingEmail = emailValidator(email);
    if (checkingEmail) {
      this.setState({ emailError: checkingEmail, error: true });
    } else {
      await signIn({ email });
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

  renderSignInForm = () => {
    const { email, emailError } = this.state;
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
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSignIn}
            id={SIGN_IN_BUTTON_ID}
          >
            {t('Sign In')}
          </Button>
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

    return (
      <div className={classes.fullScreen}>
        <Typography variant="h2" component="h2">
          {t('Sign In')}
        </Typography>
        {this.renderSignInForm()}
      </div>
    );
  }
}

const StyledComponent = withStyles(styles, { withTheme: true })(SignIn);
const TranslatedComponent = withTranslation()(StyledComponent);
export default withRouter(TranslatedComponent);
