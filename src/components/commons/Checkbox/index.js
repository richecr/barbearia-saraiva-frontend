import { FormControlLabel, Checkbox as CB } from '@mui/material';

export default function Checkbox({ label, value, onChange, required }) {
  return (
    <FormControlLabel
      label={label}
      control={<CB value={value} checked={value} onChange={onChange} required={required} />}
    />
  );
}
