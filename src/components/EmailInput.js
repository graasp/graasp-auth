import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { emailValidator } from '../utils/validation';

const EmailInput = ({
  className,
  setValue,
  onKeyPress,
  required,
  value,
  id,
  disabled,
  shouldValidate,
}) => {
  const { t } = useTranslation();
  const [error, setError] = useState('');

  useEffect(() => {
    if (shouldValidate) {
      setError(emailValidator(value));
    }
  }, [shouldValidate]);

  const handleEmailOnChange = (e) => {
    const newEmail = e.target.value;
    setValue?.(newEmail);
    if (shouldValidate) {
      setError(emailValidator(newEmail));
    }
  };

  return (
    <TextField
      variant="outlined"
      label={t('Email')}
      className={className}
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
  className: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  setValue: PropTypes.func,
  onKeyPress: PropTypes.func,
  shouldValidate: PropTypes.bool,
};

EmailInput.defaultProps = {
  className: null,
  required: true,
  value: '',
  id: null,
  disabled: false,
  setValue: null,
  onKeyPress: null,
  shouldValidate: true,
};

export default EmailInput;
