import { styled } from '@mui/material';
import MuiDivider from '@mui/material/Divider';

const Divider = styled(MuiDivider)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const StyledDivider = () => <Divider variant="middle" />;

export default StyledDivider;
