import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useSnackbar } from 'notistack';
import { Button, Grid, TextField, Link } from '@mui/material';

import RegisterStore from '../../stores/RegisterStore';

import Item from '../../components/commons/Item';
import Checkbox from '../../components/commons/Checkbox';
import DateField from '../../components/commons/DateField';
import { Password } from '../../components/commons/Password';
import PhoneField from '../../components/commons/PhoneField';

import photoLogin from '../../assets/logo.png';

const RegisterPage = observer(() => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    return () => RegisterStore.clear();
  }, []);

  async function onFinish(e) {
    e.preventDefault();
    await RegisterStore.save(
      () => {
        enqueueSnackbar('Você fez cadastro com sucesso!', {
          variant: 'success'
        });
        navigate('/entrar');
      },
      (msg) => {
        enqueueSnackbar('Algum problema! Motivo: ' + msg, {
          variant: 'error'
        });
      }
    );
  }

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}>
      <Grid item xs={12}>
        <Item>
          <img src={photoLogin} alt="Logo Barbearia Saraiva" />
          <h1>Cadastro</h1>
          <Grid columns={1}>
            <form onSubmit={onFinish}>
              <Item>
                <TextField
                  required
                  fullWidth
                  label="Nome"
                  placeholder="Digite seu nome"
                  value={RegisterStore.user.name}
                  helperText={RegisterStore.user.errors.name}
                  onBlur={(e) => RegisterStore.user.validate('name')}
                  error={RegisterStore.user.errors.name ? true : false}
                  onChange={(e) => RegisterStore.updateAttribute('name', e.target.value)}
                />
              </Item>

              <Item>
                <TextField
                  required
                  fullWidth
                  label="E-mail"
                  placeholder="Digite seu e-mail"
                  value={RegisterStore.user.email}
                  helperText={RegisterStore.user.errors.email}
                  onBlur={(e) => RegisterStore.user.validate('email')}
                  error={RegisterStore.user.errors.email ? true : false}
                  onChange={(e) => RegisterStore.updateAttribute('email', e.target.value)}
                />
              </Item>

              <Item>
                <DateField
                  required
                  format="DD/MM/yyyy"
                  label="Data de nascimento"
                  placeholder="Selecione sua data de nascimento"
                  value={RegisterStore.user.birthday}
                  helperText={RegisterStore.user.errors.birthday}
                  onBlur={(e) => RegisterStore.user.validate('birthday')}
                  error={RegisterStore.user.errors.birthday ? true : false}
                  onChange={(e) => RegisterStore.updateAttribute('birthday', e)}
                />
              </Item>

              <Item>
                <PhoneField
                  required
                  label="Telefone"
                  placeholder="Digite seu telefone"
                  value={RegisterStore.user.telephone}
                  helperText={RegisterStore.user.errors.telephone}
                  onBlur={(e) => RegisterStore.user.validate('telephone')}
                  error={RegisterStore.user.errors.telephone ? true : false}
                  onChange={(e) => RegisterStore.updateAttribute('telephone', e.target.value)}
                />
              </Item>

              <Item>
                <Password
                  required
                  placeholder="Digite sua senha"
                  value={RegisterStore.user.password}
                  helperText={RegisterStore.user.errors.password}
                  onBlur={(e) => RegisterStore.user.validate('password')}
                  error={RegisterStore.user.errors.password ? true : false}
                  onChange={(e) => RegisterStore.updateAttribute('password', e.target.value)}
                />
              </Item>

              <Item>
                <Password
                  required
                  label="Confirme a sua senha"
                  placeholder="Digite novamente sua senha"
                  value={RegisterStore.user.confirmPassword}
                  helperText={RegisterStore.user.errors.confirmPassword}
                  onBlur={(e) => RegisterStore.user.validate('confirmPassword')}
                  error={RegisterStore.user.errors.confirmPassword ? true : false}
                  onChange={(e) => RegisterStore.updateAttribute('confirmPassword', e.target.value)}
                />
              </Item>

              <Item>
                <Checkbox
                  label="WhatsApp"
                  value={RegisterStore.user.notification_whatsapp}
                  helperText={RegisterStore.user.errors.notification_whatsapp}
                  onBlur={(e) => RegisterStore.user.validate('notification_whatsapp')}
                  error={RegisterStore.user.errors.notification_whatsapp ? true : false}
                  onChange={(e) =>
                    RegisterStore.updateAttribute('notification_whatsapp', e.target.checked)
                  }
                />
                <Checkbox
                  label="E-mail"
                  value={RegisterStore.user.notification_email}
                  helperText={RegisterStore.user.errors.notification_email}
                  onBlur={(e) => RegisterStore.user.validate('notification_email')}
                  error={RegisterStore.user.errors.notification_email ? true : false}
                  onChange={(e) => {
                    RegisterStore.updateAttribute('notification_email', e.target.checked);
                  }}
                />
              </Item>

              <Item>
                <Button fullWidth type="submit" variant="contained">
                  Cadastrar
                </Button>
              </Item>

              <Item>
                <Link to="/entrar" component={RouterLink} underline="none" variant="h4">
                  Entrar
                </Link>
              </Item>
            </form>
          </Grid>
        </Item>
      </Grid>
    </Grid>
  );
});

export default RegisterPage;
