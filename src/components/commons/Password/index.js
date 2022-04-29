import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material';

export function Password({
  label,
  value,
  onChange,
  required,
  helperText,
  error,
  onBlur,
  placeholder
}) {
  const [show, setShow] = useState(false);

  return (
    <FormControl fullWidth variant="outlined" required={required} error={error}>
      <InputLabel>{label ? label : 'Senha'}</InputLabel>
      <OutlinedInput
        label={label ? label : 'Senha'}
        type={show ? 'text' : 'password'}
        value={value}
        error={error}
        onBlur={onBlur}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShow(!show)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end">
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  );
}
