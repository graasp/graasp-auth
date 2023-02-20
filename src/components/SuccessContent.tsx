import propTypes from 'prop-types';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AUTH, namespaces } from '@graasp/translations';
import { Button } from '@graasp/ui';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Container, Typography } from '@mui/material';

import { useAuthTranslation } from '../config/i18n';
import { SUCCESS_CONTENT_ID } from '../config/selectors';

const SuccessContent = ({ title, email }) => {
  const { t } = useAuthTranslation();

  const navigate = useNavigate();

  return (
    <Container id={SUCCESS_CONTENT_ID}>
      <Typography
        variant="h4"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <MailOutlineIcon fontSize="large" sx={{ marginRight: 1 }} />
        {title}
      </Typography>
      <Typography variant="body1">
        <Trans
          ns={namespaces.auth}
          i18nKey={AUTH.SIGN_IN_SUCCESS_TEXT}
          values={{ email }}
          components={{ bold: <strong /> }}
        />
      </Typography>
      <br />
      <Typography variant="body1">
        {t(AUTH.SIGN_IN_SUCCESS_EMAIL_PROBLEM)}
      </Typography>
      <br />
      <Button variant="outlined" color="primary" onClick={() => {}}>
        Resend Email
      </Button>
      <br />
      <br />
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
    </Container>
  );
};

SuccessContent.propTypes = {
  title: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
};

export default SuccessContent;
