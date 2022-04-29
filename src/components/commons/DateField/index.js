import { TextField } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';

export default function DateField({
  label,
  format,
  placeholder,
  value,
  onChange,
  required,
  helperText,
  error,
  onBlur
}) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DesktopDatePicker
        label={label}
        inputFormat={format}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            fullWidth
            value={value}
            label={label}
            error={error}
            onBlur={onBlur}
            required={required}
            helperText={helperText}
            placeholder={placeholder}
            inputRef={params.inputRef}
            inputProps={params.inputProps}
            InputProps={params.InputProps}
          />
        )}
      />
    </LocalizationProvider>
  );
}
