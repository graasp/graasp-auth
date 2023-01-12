import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

const FullscreenContainer = ({ children }) => (
  <Box
    margin="auto"
    textAlign="center"
    height="100vh"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    {children}
  </Box>
);

FullscreenContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FullscreenContainer;
