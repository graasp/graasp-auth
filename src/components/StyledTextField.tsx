import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';

import { FORM_INPUT_MIN_WIDTH } from '../config/constants';

const StyledTextField = styled(TextField)(() => ({
  minWidth: FORM_INPUT_MIN_WIDTH,
}));
export default StyledTextField;
