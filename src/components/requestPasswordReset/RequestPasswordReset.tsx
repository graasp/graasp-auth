import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { RecaptchaAction } from '@graasp/sdk';

import { LoadingButton } from '@mui/lab';
import { Alert, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

import { HELP_EMAIL } from '../../config/constants';
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
import { EmailAdornment } from '../common/Adornments';
import { CenteredContent } from '../layout/CenteredContent';
import { DialogHeader } from '../layout/DialogHeader';

const { useCreatePasswordResetRequest } = mutations;

type Inputs = {
  email: string;
};

export function RequestPasswordReset() {
  const { t } = useAuthTranslation();
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
    isPending: isLoading,
  } = useCreatePasswordResetRequest();

  const resetPassword = async ({ email }: Inputs) => {
    const captcha = await executeCaptcha(RecaptchaAction.ResetPassword);
    requestPasswordReset({ email, captcha });
  };

  const errorMessage = getValidationMessage(errors.email);
  const hasErrors = !!errorMessage;

  return (
    <CenteredContent
      header={
        <DialogHeader
          title={t(AUTH.REQUEST_PASSWORD_RESET_TITLE)}
          description={t(AUTH.REQUEST_PASSWORD_RESET_TEXT)}
        />
      }
    >
      <Stack
        width="100%"
        component="form"
        onSubmit={handleSubmit(resetPassword)}
        gap={1}
      >
        <TextField
          id={REQUEST_PASSWORD_RESET_EMAIL_FIELD_ID}
          autoFocus
          {...register('email', {
            required: true,
            validate: isEmailValid,
          })}
          FormHelperTextProps={{
            id: REQUEST_PASSWORD_RESET_EMAIL_FIELD_HELPER_ID,
          }}
          InputProps={{
            startAdornment: EmailAdornment,
          }}
          placeholder={t(AUTH.EMAIL_INPUT_PLACEHOLDER)}
          helperText={errorMessage && t(errorMessage)}
          error={hasErrors}
          // once the request is sent disable the input
          disabled={isSuccess || isError}
        />
        {isError && (
          <Alert id={REQUEST_PASSWORD_RESET_ERROR_MESSAGE_ID} severity="error">
            {t(AUTH.REQUEST_PASSWORD_RESET_ERROR_MESSAGE, {
              email: HELP_EMAIL,
            })}
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
    </CenteredContent>
  );
}
