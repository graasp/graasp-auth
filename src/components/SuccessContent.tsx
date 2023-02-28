import propTypes from 'prop-types';
import { useState } from 'react';
import { Trans } from 'react-i18next';

// import { useNavigate } from 'react-router-dom';
import { AUTH, namespaces } from '@graasp/translations';
import { Button } from '@graasp/ui';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Container, Typography } from '@mui/material';

import { useAuthTranslation } from '../config/i18n';
// import { SUCCESS_CONTENT_ID } from '../config/selectors';
import { BACK_BUTTON_ID, RESEND_EMAIL_BUTTON_ID } from '../config/selectors';

const SuccessContent = ({
  id,
  title,
  email,
  handleBackButtonClick = null,
  handleResendEmail = null,
}) => {
  const { t } = useAuthTranslation();
  const [clicked, setClicked] = useState(false);
  // const navigate = useNavigate();

  const onClickResendEmail = () => {
    setClicked(true);
    handleResendEmail();
  };

  return (
    <Container id={id}>
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
      <Button
        variant="outlined"
        color="primary"
        onClick={onClickResendEmail}
        id={RESEND_EMAIL_BUTTON_ID}
        disabled={clicked}
      >
        Resend Email
      </Button>
      <br />
      <br />
      <Button
        variant="outlined"
        color="primary"
        id={BACK_BUTTON_ID}
        onClick={handleBackButtonClick}
      >
        Back
      </Button>
    </Container>
  );
};

SuccessContent.propTypes = {
  id: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  handleBackButtonClick: propTypes.func,
  handleResendEmail: propTypes.func,
};

export default SuccessContent;
