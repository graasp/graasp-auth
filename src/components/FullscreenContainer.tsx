import Box from '@mui/material/Box';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const FullscreenContainer = ({ children }: Props): JSX.Element => (
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

export default FullscreenContainer;
