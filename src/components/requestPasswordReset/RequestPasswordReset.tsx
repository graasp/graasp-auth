import { MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { RecaptchaAction } from '@graasp/sdk';
import { GraaspLogo } from '@graasp/ui';

import { LoadingButton } from '@mui/lab';
import {
  Alert,
  InputAdornment,
  Stack,
  TextField,
  useTheme,
} from '@mui/material';
import Typography from '@mui/material/Typography';

import { BACKGROUND_PATTERN } from '../../config/constants';
import { useAuthTranslation } from '../../config/i18n';
import { SIGN_IN_PATH } from '../../config/paths';
import { mutations } from '../../config/queryClient';
import {
  REQUEST_PASSWORD_RESET_EMAIL_FIELD_HELPER_ID,
  REQUEST_PASSWORD_RESET_EMAIL_FIELD_ID,
  REQUEST_PASSWORD_RESET_ERROR_MESSAGE_ID,
  REQUEST_PASSWORD_RESET_SUBMIT_BUTTON_ID,
  REQUEST_PASSWORD_RESET_SUCCESS_MESSAGE_ID,
} from '../../config/selectors';
import { useRecaptcha } from '../../context/RecaptchaContext';
import { AUTH } from '../../langs/constants';
import { getValidationMessage, isEmailValid } from '../../utils/validation';
import APIChecker from '../APIChecker';
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

  const {
    mutate: requestPasswordReset,
    isError,
    isSuccess,
    isLoading,
  } = useCreatePasswordResetRequest();

  // enable validation after first click

  const resetPassword = async ({ email }: Inputs) => {
    const captcha = await executeCaptcha(RecaptchaAction.ResetPassword);
    requestPasswordReset({ email, captcha });
  };

  const errorMessage = getValidationMessage(errors.email);
  const hasErrors = !!errorMessage;

  return (
    <Stack
      direction="column"
      margin="auto"
      minHeight="100svh"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: BACKGROUND_PATTERN,
      }}
      gap={5}
      p={2}
    >
      <APIChecker />
      <Stack {...styledBox} borderRadius={2} p={{ xs: 2, sm: 4 }}>
        {
          <Stack
            direction="column"
            alignItems="center"
            spacing={3}
            maxWidth="50ch"
          >
            <Stack direction="column" alignItems="center" spacing={1}>
              <GraaspLogo
                height={90}
                sx={{ fill: theme.palette.primary.main }}
              />
              <Typography variant="h4" component="h2">
                {t(AUTH.REQUEST_PASSWORD_RESET_TITLE)}
              </Typography>
              <Typography>{t(AUTH.REQUEST_PASSWORD_RESET_TEXT)}</Typography>
            </Stack>
            <Stack
              width="100%"
              component="form"
              onSubmit={handleSubmit(resetPassword)}
              gap={1}
            >
              <TextField
                id={REQUEST_PASSWORD_RESET_EMAIL_FIELD_ID}
                {...register('email', {
                  required: true,
                  validate: isEmailValid,
                })}
                FormHelperTextProps={{
                  id: REQUEST_PASSWORD_RESET_EMAIL_FIELD_HELPER_ID,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon />
                    </InputAdornment>
                  ),
                }}
                helperText={errorMessage && t(errorMessage)}
                error={hasErrors}
                // once the request is sent disable the input
                disabled={isSuccess || isError}
              />
              {isError && (
                <Alert
                  id={REQUEST_PASSWORD_RESET_ERROR_MESSAGE_ID}
                  severity="error"
                >
                  {t(AUTH.REQUEST_PASSWORD_RESET_ERROR_MESSAGE)}
                </Alert>
              )}
              {isSuccess ? (
                <Alert
                  id={REQUEST_PASSWORD_RESET_SUCCESS_MESSAGE_ID}
                  severity="success"
                >
                  {t(AUTH.REQUEST_PASSWORD_RESET_SUCCESS_MESSAGE)}
                </Alert>
              ) : (
                <LoadingButton
                  variant="contained"
                  loading={isLoading}
                  id={REQUEST_PASSWORD_RESET_SUBMIT_BUTTON_ID}
                  fullWidth
                  type="submit"
                  disabled={hasErrors}
                >
                  {t(AUTH.REQUEST_PASSWORD_RESET_BUTTON)}
                </LoadingButton>
              )}
            </Stack>
            <Typography
              component={Link}
              color="textSecondary"
              sx={{ textDecoration: 'none' }}
              to={SIGN_IN_PATH}
            >
              {t(AUTH.REQUEST_PASSWORD_RESET_BACK_BUTTON)}
            </Typography>
          </Stack>
        }
      </Stack>
    </Stack>
  );
};
