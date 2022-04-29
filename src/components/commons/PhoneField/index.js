import { TextField } from '@mui/material';
import React from 'react';
import { IMaskInput } from 'react-imask';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(00) 0 0000-0000"
      definitions={{
        '#': /[1-9]/
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default function PhoneField({
  label,
  value,
  onChange,
  required,
  helperText,
  error,
  onBlur
}) {
  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      error={error}
      onBlur={onBlur}
      onChange={onChange}
      required={required}
      helperText={helperText}
      id="formatted-text-mask-input"
      InputProps={{
        inputComponent: TextMaskCustom
      }}
    />
  );
}
