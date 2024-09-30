import { MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { RecaptchaAction } from '@graasp/sdk';
import { Button, GraaspLogo } from '@graasp/ui';

import { InputAdornment, Stack, TextField, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

import { BACKGROUND_PATTERN } from '../../config/constants';
import { useAuthTranslation } from '../../config/i18n';
import { SIGN_IN_PATH } from '../../config/paths';
import { mutations } from '../../config/queryClient';
import { EMAIL_SIGN_IN_FIELD_ID } from '../../config/selectors';
import { useRecaptcha } from '../../context/RecaptchaContext';
import { AUTH } from '../../langs/constants';
import { emailValidator, getValidationMessage } from '../../utils/validation';
import { styledBox } from '../styles';

const { useCreatePasswordResetRequest } = mutations;

type Inputs = {
  email: string;
};

export const RequestPasswordReset = () => {
  const { t } = useAuthTranslation();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { executeCaptcha } = useRecaptcha();

  const { mutate: requestPasswordReset } = useCreatePasswordResetRequest();

  // enable validation after first click

  const resetPassword = async ({ email }: Inputs) => {
    const captcha = await executeCaptcha(RecaptchaAction.ResetPassword);
    requestPasswordReset({ email, captcha });
  };

  const hasErrors = !!errors.email;
  const errorMessage = getValidationMessage(errors.email);

  return (
    <Stack
      direction="row"
      margin="auto"
      height="100svh"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: BACKGROUND_PATTERN,
      }}
    >
      <Stack {...styledBox} borderRadius={2} p={2}>
        {
          <Stack direction="column" alignItems="center" spacing={3}>
            <Stack direction="column" alignItems="center" spacing={1}>
              <GraaspLogo
                height={90}
                sx={{ fill: theme.palette.primary.main }}
              />
              <Typography variant="h4" component="h2">
                {t(AUTH.PASSWORD_RESET_REQUEST_TITLE)}
              </Typography>
              <Typography maxWidth="50ch">
                {t(AUTH.PASSWORD_RESET_REQUEST_TEXT)}
              </Typography>
            </Stack>
            <Stack
              width="100%"
              component="form"
              onSubmit={handleSubmit(resetPassword)}
              gap={1}
            >
              <TextField
                {...register('email', {
                  required: true,
                  validate: (email) => emailValidator(email),
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon />
                    </InputAdornment>
                  ),
                }}
                helperText={errorMessage && t(errorMessage)}
                error={hasErrors}
                id={EMAIL_SIGN_IN_FIELD_ID}
              />
              <Button fullWidth type="submit" disabled={hasErrors}>
                {t(AUTH.PASSWORD_RESET_REQUEST_BUTTON)}
              </Button>
            </Stack>
            <Typography
              component={Link}
              color="textSecondary"
              sx={{ textDecoration: 'none' }}
              to={SIGN_IN_PATH}
            >
              {t(AUTH.PASSWORD_RESET_REQUEST_BACK_BUTTON)}
            </Typography>
          </Stack>
        }
      </Stack>
    </Stack>
  );
};
