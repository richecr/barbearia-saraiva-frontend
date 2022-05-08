import { TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';

const TimeField = ({
  label,
  format,
  maxTime,
  minTime,
  placeholder,
  value,
  onChange,
  required,
  helperText,
  error,
  onBlur
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} locale="pt">
      <TimePicker
        ampm={false}
        label={label}
        value={value}
        minTime={minTime}
        maxTime={maxTime}
        onChange={onChange}
        inputFormat={format}
        renderInput={(params) => (
          <TextField
            {...params}
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
};

export default TimeField;
