import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';

const FORM_INPUT_MIN_WIDTH = 300;

export const StyledTextField = styled(TextField)(() => ({
  minWidth: FORM_INPUT_MIN_WIDTH,
}));
