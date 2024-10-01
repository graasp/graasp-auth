import { GraaspLogo } from '@graasp/ui';

import { Stack, Typography, useTheme } from '@mui/material';

type DialogHeaderProps = {
  title: string;
  description?: string;
};
export const DialogHeader = ({ title, description }: DialogHeaderProps) => {
  const theme = useTheme();

  return (
    <Stack direction="column" alignItems="center" spacing={1}>
      <GraaspLogo height={90} sx={{ fill: theme.palette.primary.main }} />
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      {description && <Typography pt={2}>{description}</Typography>}
    </Stack>
  );
};
