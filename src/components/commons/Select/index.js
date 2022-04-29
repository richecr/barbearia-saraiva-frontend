import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

const SelectOptions = ({
  value,
  label,
  onChange,
  options,
  error,
  onBlur,
  required,
  helperText,
  placeholder
}) => {
  return (
    <FormControl fullWidth required={required} error={error}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        error={error}
        value={value}
        label={label}
        onBlur={onBlur}
        placeholder={placeholder}
        onChange={onChange}>
        {options?.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectOptions;
