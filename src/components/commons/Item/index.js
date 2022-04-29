import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme, align = 'center', spacing = 1, marginBottom = 0 }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(spacing),
  marginBottom: marginBottom,
  textAlign: align,
  color: theme.palette.text.secondary
}));

export default Item;
