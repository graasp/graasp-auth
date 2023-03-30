import { Alert, Container } from '@mui/material';

const ErrorBanner = () => {
  return (
    <Container>
      <Alert severity="error">
        Graasp is currently experiencing an email outage. You can continue to
        log in using your email and password, if you have set these up. If not,
        please contact <strong>help@graasp.org</strong> for assistance. We
        apologize for the inconvenience. ⛑️ »
      </Alert>
    </Container>
  );
};

export default ErrorBanner;
