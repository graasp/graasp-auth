import { Checkbox, FormControlLabel, Typography } from '@mui/material';

type Props = {
  label: string;
  link: string;
  linkLabel: string;
  dataCy: string;

  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
};

export const AgreementCheckbox = ({
  label,
  link,
  linkLabel,
  dataCy,
  isChecked,
  onChange,
}: Props) => {
  return (
    <FormControlLabel
      checked={isChecked}
      onChange={(_, checked) => onChange(checked)}
      required
      control={<Checkbox data-cy={dataCy} size="small" />}
      label={
        <Typography display="inline" fontSize="small">
          {label}{' '}
          <a href={link} target="_blank" rel="noreferrer">
            {linkLabel}
          </a>
          .
        </Typography>
      }
    />
  );
};
