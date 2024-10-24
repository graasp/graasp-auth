import { Box, Stack, Typography } from '@mui/material';

type Props = {
  Icon: (args: { size: number; primaryColor: string }) => JSX.Element;
  name: string;
  text: string;
  color: string;
};

export function PlatformContent({ Icon, name, text, color }: Props) {
  return (
    <Stack width="100%" direction="row" alignItems="center">
      <Icon primaryColor={color} size={110} />
      <Box>
        <Typography variant="h5" textAlign="left">
          {text}
        </Typography>

        <Typography variant="h2" component="h2" color={color} width="100%">
          {name}
        </Typography>
      </Box>
    </Stack>
  );
}
