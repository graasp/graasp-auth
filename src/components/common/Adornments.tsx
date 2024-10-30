import { LockIcon, MailIcon } from 'lucide-react';

import { InputAdornment } from '@mui/material';

export const EmailAdornment = (
  <InputAdornment position="start" sx={{ color: 'inherit' }}>
    <MailIcon color="currentColor" />
  </InputAdornment>
);
export const PasswordAdornment = (
  <InputAdornment position="start" sx={{ color: 'inherit' }}>
    <LockIcon color="currentColor" />
  </InputAdornment>
);
