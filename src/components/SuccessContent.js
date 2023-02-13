import propTypes from 'prop-types';
import React from 'react';

import { AUTH, namespaces } from '@graasp/translations';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Container, Typography } from '@mui/material';

import { Trans, useAuthTranslation } from '../config/i18n';

const SuccessContent = ({ title, email }) => {
  const { t } = useAuthTranslation();

  return (
    <Container>
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
          email={email}
        />
      </Typography>
      <br />
      <Typography variant="body1">
        {t(AUTH.SIGN_IN_SUCCESS_EMAIL_PROBLEM)}
      </Typography>
    </Container>
  );
};

SuccessContent.propTypes = {
  title: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
};

export default SuccessContent;
