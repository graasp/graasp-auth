import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';

import { isPasswordStrong } from '@graasp/sdk';

import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';

import { HELP_EMAIL } from '../../config/constants';
import { useAuthTranslation } from '../../config/i18n';
import { REQUEST_PASSWORD_RESET_PATH, SIGN_IN_PATH } from '../../config/paths';
import { mutations } from '../../config/queryClient';
import {
  RESET_PASSWORD_BACK_TO_LOGIN_BUTTON_ID,
  RESET_PASSWORD_ERROR_MESSAGE_ID,
  RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ERROR_TEXT_ID,
  RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ID,
  RESET_PASSWORD_NEW_PASSWORD_FIELD_ERROR_TEXT_ID,
  RESET_PASSWORD_NEW_PASSWORD_FIELD_ID,
  RESET_PASSWORD_SUBMIT_BUTTON_ID,
  RESET_PASSWORD_SUCCESS_MESSAGE_ID,
} from '../../config/selectors';
import { useValidateJWTToken } from '../../hooks/useValidateJWTToken';
import { AUTH } from '../../langs/constants';
import { getValidationMessage } from '../../utils/validation';
import { PasswordAdornment } from '../common/Adornments';
import { CenteredContent } from '../layout/CenteredContent';
import { DialogHeader } from '../layout/DialogHeader';
import { InvalidTokenScreen } from './InvalidTokenScreen';

const { useResolvePasswordResetRequest } = mutations;

type Inputs = {
  password: string;
  confirmPassword: string;
};
export function ResetPassword() {
  const { t } = useAuthTranslation();
  const [searchParams] = useSearchParams();
  const { isValid, token } = useValidateJWTToken(searchParams.get('t'));

  const [showPasswords, setShowPasswords] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const {
    mutate: resolveRequestPasswordReset,
    isPending: isLoading,
    isError,
    isSuccess,
  } = useResolvePasswordResetRequest();

  if (!isValid) {
    return <InvalidTokenScreen />;
  }

  const resetPassword = ({ password }: Inputs) => {
    resolveRequestPasswordReset({ password, token });
  };

  const passwordErrorMessage = getValidationMessage(errors.password);
  const confirmPasswordErrorMessage = getValidationMessage(
    errors.confirmPassword,
  );
  const hasErrors = Boolean(
    passwordErrorMessage || confirmPasswordErrorMessage,
  );

  return (
    <CenteredContent
      header={
        <DialogHeader
          title={t(AUTH.RESET_PASSWORD_TITLE)}
          description={
            <Stack gap={1} width="100%">
              {t(AUTH.RESET_PASSWORD_DESCRIPTION)}
              <Typography>
                {t(AUTH.RESET_PASSWORD_REQUIREMENTS_TITLE)}
                <ul style={{ margin: 0 }}>
                  <li>
                    {t(AUTH.RESET_PASSWORD_REQUIREMENTS_LENGTH, { length: 8 })}
                  </li>
                  <li>
                    {t(AUTH.RESET_PASSWORD_REQUIREMENTS_LOWERCASE, {
                      count: 1,
                    })}
                  </li>
                  <li>
                    {t(AUTH.RESET_PASSWORD_REQUIREMENTS_UPPERCASE, {
                      count: 1,
                    })}
                  </li>
                  <li>
                    {t(AUTH.RESET_PASSWORD_REQUIREMENTS_NUMBER, {
                      count: 1,
                    })}
                  </li>
                </ul>
              </Typography>
            </Stack>
          }
        />
      }
    >
      <Stack
        component="form"
        onSubmit={handleSubmit(resetPassword)}
        direction="column"
        alignItems="center"
        spacing={1}
        width="100%"
      >
        <TextField
          id={RESET_PASSWORD_NEW_PASSWORD_FIELD_ID}
          slotProps={{
            input: {
              startAdornment: PasswordAdornment,
            },
            formHelperText: {
              id: RESET_PASSWORD_NEW_PASSWORD_FIELD_ERROR_TEXT_ID,
            },
          }}
          {...register('password', {
            required: true,
            validate: (value) =>
              isPasswordStrong(value) || AUTH.PASSWORD_WEAK_ERROR,
          })}
          label={t(AUTH.RESET_PASSWORD_NEW_PASSWORD_FIELD_LABEL)}
          variant="outlined"
          error={Boolean(passwordErrorMessage)}
          helperText={passwordErrorMessage && t(passwordErrorMessage)}
          type={showPasswords ? '' : 'password'}
          fullWidth
          disabled={isSuccess || isError}
        />
        <TextField
          id={RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ID}
          slotProps={{
            input: {
              startAdornment: PasswordAdornment,
            },
            formHelperText: {
              id: RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ERROR_TEXT_ID,
            },
          }}
          {...register('confirmPassword', {
            required: true,
            validate: {
              strong: (value) =>
                isPasswordStrong(value) || AUTH.PASSWORD_WEAK_ERROR,
              match: (confirmPassword, formState) =>
                confirmPassword === formState.password ||
                AUTH.PASSWORD_DO_NOT_MATCH_ERROR,
            },
          })}
          label={t(AUTH.RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_LABEL)}
          variant="outlined"
          error={Boolean(confirmPasswordErrorMessage)}
          helperText={
            confirmPasswordErrorMessage && t(confirmPasswordErrorMessage)
          }
          type={showPasswords ? '' : 'password'}
          fullWidth
          disabled={isSuccess || isError}
        />
        <FormControlLabel
          sx={{ width: '100%' }}
          control={
            <Checkbox
              value={showPasswords}
              onChange={() => setShowPasswords((v) => !v)}
            />
          }
          label={t(AUTH.SHOW_PASSWORD)}
        />
        {isError && (
          <>
            <Alert id={RESET_PASSWORD_ERROR_MESSAGE_ID} severity="error">
              {t(AUTH.RESET_PASSWORD_ERROR_MESSAGE, { email: HELP_EMAIL })}
            </Alert>
            <Button
              variant="contained"
              fullWidth
              component={Link}
              to={REQUEST_PASSWORD_RESET_PATH}
              sx={{ textDecoration: 'none' }}
            >
              {t(AUTH.REQUEST_PASSWORD_RESET_TITLE)}
            </Button>
          </>
        )}
        {isSuccess ? (
          <>
            <Alert id={RESET_PASSWORD_SUCCESS_MESSAGE_ID} severity="success">
              {t(AUTH.RESET_PASSWORD_SUCCESS_MESSAGE)}
            </Alert>
            <Button
              variant="contained"
              fullWidth
              component={Link}
              to={SIGN_IN_PATH}
              id={RESET_PASSWORD_BACK_TO_LOGIN_BUTTON_ID}
            >
              {t(AUTH.BACK_TO_SIGN_IN_BUTTON)}
            </Button>
          </>
        ) : (
          <LoadingButton
            id={RESET_PASSWORD_SUBMIT_BUTTON_ID}
            variant="contained"
            loading={isLoading}
            fullWidth
            type="submit"
            disabled={hasErrors || isError}
          >
            {t(AUTH.RESET_PASSWORD_BUTTON)}
          </LoadingButton>
        )}
      </Stack>
      {
        // only show this when `isSuccess` is false
        !isSuccess && (
          <Typography
            component={Link}
            to={SIGN_IN_PATH}
            color="textSecondary"
            sx={{ textDecoration: 'none' }}
          >
            {t(AUTH.BACK_TO_SIGN_IN_BUTTON)}
          </Typography>
        )
      }
    </CenteredContent>
  );
}
