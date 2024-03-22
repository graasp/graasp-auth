import { useTheme } from '@graasp/ui';

import { Box, Typography } from '@mui/material';

const Footer = () => {
  const { languageSelect } = useTheme();

  return (
    <Box
      position="absolute"
      bottom={0}
      display="flex"
      justifyContent="end"
      alignItems="center"
      flexDirection="column"
      width="100%"
    >
      {languageSelect}
      <Typography variant="caption" color="darkgrey">
        © Graasp 2014 - {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
