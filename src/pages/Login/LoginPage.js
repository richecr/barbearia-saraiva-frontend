import React, { useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useSnackbar } from 'notistack';
import { Button, Grid, TextField, Link } from '@mui/material';

import LoginStore from '../../stores/LoginStore';
import { useUserStore } from '../../providers/UserProvider';

import Item from '../../components/commons/Item';
import { Password } from '../../components/commons/Password';

import photoLogin from '../../assets/logo.png';

const LoginPage = observer((props) => {
  const navigate = useNavigate();
  const UserStore = useUserStore();
  const { enqueueSnackbar } = useSnackbar();

  const onFinish = async (e) => {
    e.preventDefault();
    await UserStore.login(
      LoginStore.user_login,
      () => {
        enqueueSnackbar('Você fez login com sucesso!', {
          variant: 'success'
        });
        navigate('/eventos');
      },
      (msg) => {
        enqueueSnackbar(msg, {
          variant: 'error'
        });
      }
    );
  };

  useEffect(() => {
    if (UserStore.verifyIsAuthenticated()) {
      navigate('/eventos');
    }
  });

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Item>
            <img src={photoLogin} alt="Logo da Barbearia Saraiva" />
            <h1>Entrar</h1>
            <Grid columns={1}>
              <form onSubmit={onFinish}>
                <Item>
                  <TextField
                    fullWidth
                    label="E-mail"
                    value={LoginStore.user_login.email}
                    onChange={(e) => LoginStore.updateAttribute('email', e.target.value)}
                  />
                </Item>

                <Item>
                  <Password
                    value={LoginStore.user_login.password}
                    onChange={(e) => LoginStore.updateAttribute('password', e.target.value)}
                  />
                </Item>

                <Item>
                  <Button fullWidth type="submit" variant="contained">
                    Entrar
                  </Button>
                </Item>

                <Item>
                  <Link to="/cadastro" component={RouterLink} underline="none" variant="h4">
                    Criar uma conta
                  </Link>
                </Item>
              </form>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </>
  );
});

export default LoginPage;
