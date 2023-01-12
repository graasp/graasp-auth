import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { AUTH } from '@graasp/translations';

import { useAuthTranslation } from '../config/i18n';
import { emailValidator } from '../utils/validation';
import StyledTextField from './StyledTextField';

const EmailInput = ({
  setValue,
  onKeyPress,
  required,
  value,
  id,
  disabled,
  shouldValidate,
}) => {
  const { t } = useAuthTranslation();
  const [error, setError] = useState('');

  useEffect(() => {
    if (shouldValidate) {
      setError(emailValidator(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldValidate]);

  const handleEmailOnChange = (e) => {
    const newEmail = e.target.value;
    setValue?.(newEmail);
    if (shouldValidate) {
      setError(emailValidator(newEmail));
    }
  };

  return (
    <StyledTextField
      variant="outlined"
      label={t(AUTH.EMAIL_FIELD_TEXT)}
      required={required}
      value={value}
      error={Boolean(error)}
      helperText={error}
      onChange={handleEmailOnChange}
      id={id}
      type="email"
      disabled={disabled}
      onKeyPress={onKeyPress}
    />
  );
};

EmailInput.propTypes = {
  required: PropTypes.bool,
  value: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  setValue: PropTypes.func,
  onKeyPress: PropTypes.func,
  shouldValidate: PropTypes.bool,
};

EmailInput.defaultProps = {
  required: true,
  value: '',
  id: null,
  disabled: false,
  setValue: null,
  onKeyPress: null,
  shouldValidate: true,
};

export default EmailInput;
