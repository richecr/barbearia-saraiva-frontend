import { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import { useSnackbar } from 'notistack';
import { Button, Grid, Link } from '@mui/material';

import Item from '../Item';
import { TypeFormPage } from '../../../constants/Constants';

const FormIndex = ({
  title,
  children,
  id,
  getById,
  saveRegister,
  updateRegister,
  operation,
  route
}) => {
  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  let [type, setType] = useState(TypeFormPage.NEW);

  async function onFinish(e) {
    e.preventDefault();
    if (type === TypeFormPage.UPDATE) {
      await updateRegister(
        id,
        () => {
          enqueueSnackbar(`Você fez atualização do(a) ${operation}!`, {
            variant: 'success'
          });
          navigate(route);
        },
        (msg) => {
          enqueueSnackbar(msg, {
            variant: 'error'
          });
        }
      );
    } else {
      await saveRegister(
        () => {
          enqueueSnackbar(`Você fez adição de um(a) ${operation}!`, {
            variant: 'success'
          });
          navigate(route);
        },
        (msg) => {
          enqueueSnackbar(msg, {
            variant: 'error'
          });
        }
      );
    }
  }

  useEffect(() => {
    if (id) {
      setType(TypeFormPage.UPDATE);
      getById(id, (msg) => {
        enqueueSnackbar(msg, {
          variant: 'error'
        });
      });
    }
  }, []);

  return (
    <Grid item xs={12}>
      <Item>
        <h1>{title}</h1>
        <Grid columns={1}>
          <form onSubmit={onFinish}>
            {children}
            <Item>
              <Button fullWidth type="submit" variant="contained">
                {type === TypeFormPage.UPDATE ? `Atualizar ${operation}` : `Cadastrar ${operation}`}
              </Button>
            </Item>

            <Item>
              <Link to={route} component={RouterLink} underline="none" variant="h4">
                Voltar
              </Link>
            </Item>
          </form>
        </Grid>
      </Item>
    </Grid>
  );
};

export default FormIndex;
