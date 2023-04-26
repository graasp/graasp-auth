import { useTheme } from '@graasp/ui';

import { Box } from '@mui/material';

const Footer = () => {
  const { languageSelect } = useTheme();

  return (
    <Box
      position="absolute"
      bottom={0}
      display="flex"
      justifyContent="end"
      alignItems="flex-end"
      flexDirection="column"
      width="100%"
    >
      {languageSelect}
    </Box>
  );
};

export default Footer;
