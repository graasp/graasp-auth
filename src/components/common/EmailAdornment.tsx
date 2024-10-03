import { MailIcon } from 'lucide-react';

import { InputAdornment } from '@mui/material';

export const EmailAdornment = (
  <InputAdornment position="start" sx={{ color: 'inherit' }}>
    <MailIcon color="currentColor" />
  </InputAdornment>
);
