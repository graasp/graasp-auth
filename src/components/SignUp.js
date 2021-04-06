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

const styles = (theme) => ({
  fullScreen: {
    margin: 'auto',
    textAlign: 'center',
  },
  input: {
    margin: theme.spacing(1),
  },
  form: {
    width: '50%',
    minWidth: '200px',
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
    this.setState({ email: e.target.value });
  };

  handleNameOnChange = (e) => {
    this.setState({ name: e.target.value });
  };

  register = async () => {
    const { email, name } = this.state;
    signUp({ name, email });
  };

  renderForm = () => {
    const { classes, t } = this.props;
    const { email, name } = this.state;

    return (
      <>
        <Grid item xs={12}>
          <TextField
            className={classes.input}
            required
            label={t('Name')}
            variant="outlined"
            value={name}
            onChange={this.handleNameOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.input}
            required
            label={t('Email')}
            variant="outlined"
            value={email}
            onChange={this.handleEmailOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={this.register}>
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
