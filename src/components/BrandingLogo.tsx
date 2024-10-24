import { GraaspLogo } from '@graasp/ui';

import { Stack, Typography, useTheme } from '@mui/material';

export function BrandingLogo() {
  const theme = useTheme();

  return (
    <div style={{ position: 'absolute', top: 10, left: 10 }}>
      <Stack m={1} direction="row" justifyContent="center" alignItems="center">
        <GraaspLogo height={50} sx={{ fill: theme.palette.primary.main }} />
        <Typography variant="h2" color="primary">
          Graasp
        </Typography>
      </Stack>
    </div>
  );
}
