import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import { useSnackbar } from 'notistack';
import { Button, Link, TextField } from '@mui/material';

import Item from '../../components/commons/Item';
import Dashboard from '../../components/Dashboard';
import ProfileStore from '../../stores/ProfileStore';
import Checkbox from '../../components/commons/Checkbox';
import DateField from '../../components/commons/DateField';
import PhoneField from '../../components/commons/PhoneField';
import { Password } from '../../components/commons/Password';

const ProfilePage = observer(() => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  async function onFinish() {
    await ProfileStore.update(
      () => {
        enqueueSnackbar('Você fez atualização com sucesso!', {
          variant: 'success'
        });
        navigate('/eventos');
      },
      (msg) => {
        enqueueSnackbar('Algum problema! Motivo: ' + msg, {
          variant: 'error'
        });
      }
    );
  }

  async function getUser() {
    return await ProfileStore.getUser((msg) => {
      enqueueSnackbar('Algum problema! Motivo: ' + msg, {
        variant: 'error'
      });
    });
  }

  useEffect(() => {
    getUser();
    ProfileStore.updateAttribute('password', '');
  }, []);

  return (
    <Dashboard>
      <Item>
        <form onSubmit={onFinish}>
          <h1>Meus Dados</h1>
          <Item>
            <TextField
              required
              fullWidth
              label="Nome"
              placeholder="Digite seu nome"
              value={ProfileStore.user.name}
              helperText={ProfileStore.user.errors.name}
              onBlur={(e) => ProfileStore.user.validate('name')}
              error={ProfileStore.user.errors.name ? true : false}
              onChange={(e) => ProfileStore.updateAttribute('name', e.target.value)}
            />
          </Item>

          <Item>
            <TextField
              required
              fullWidth
              label="E-mail"
              placeholder="Digite seu e-mail"
              value={ProfileStore.user.email}
              helperText={ProfileStore.user.errors.email}
              onBlur={(e) => ProfileStore.user.validate('email')}
              error={ProfileStore.user.errors.email ? true : false}
              onChange={(e) => ProfileStore.updateAttribute('email', e.target.value)}
            />
          </Item>

          <Item>
            <DateField
              required
              format="DD/MM/yyyy"
              label="Data de nascimento"
              placeholder="Selecione sua data de nascimento"
              value={ProfileStore.user.birthday}
              helperText={ProfileStore.user.errors.birthday}
              onBlur={(e) => ProfileStore.user.validate('birthday')}
              error={ProfileStore.user.errors.birthday ? true : false}
              onChange={(e) => ProfileStore.updateAttribute('birthday', e)}
            />
          </Item>

          <Item>
            <PhoneField
              required
              label="Telefone"
              placeholder="Digite seu telefone"
              value={ProfileStore.user.telephone}
              helperText={ProfileStore.user.errors.telephone}
              onBlur={(e) => ProfileStore.user.validate('telephone')}
              error={ProfileStore.user.errors.telephone ? true : false}
              onChange={(e) => ProfileStore.updateAttribute('telephone', e.target.value)}
            />
          </Item>

          <Item>
            <Password
              label="Sua nova senha"
              placeholder="Digite sua nova senha"
              value={ProfileStore.user.password}
              onChange={(e) => ProfileStore.updateAttribute('password', e.target.value)}
            />
          </Item>

          <Item>
            <Password
              label="Confirme a sua nova senha"
              placeholder="Digite novamente sua nova senha"
              value={ProfileStore.user.confirmPassword}
              onChange={(e) => ProfileStore.updateAttribute('confirmPassword', e.target.value)}
            />
          </Item>

          <Item>
            <Checkbox
              label="WhatsApp"
              value={ProfileStore.user.notification_whatsapp}
              helperText={ProfileStore.user.errors.notification_whatsapp}
              onBlur={(e) => ProfileStore.user.validate('notification_whatsapp')}
              error={ProfileStore.user.errors.notification_whatsapp ? true : false}
              onChange={(e) =>
                ProfileStore.updateAttribute('notification_whatsapp', e.target.checked)
              }
            />
            <Checkbox
              label="E-mail"
              value={ProfileStore.user.notification_email}
              helperText={ProfileStore.user.errors.notification_email}
              onBlur={(e) => ProfileStore.user.validate('notification_email')}
              error={ProfileStore.user.errors.notification_email ? true : false}
              onChange={(e) => {
                ProfileStore.updateAttribute('notification_email', e.target.checked);
              }}
            />
          </Item>

          <Item>
            <Button fullWidth type="submit" variant="contained">
              Atualizar
            </Button>
          </Item>

          <Item>
            <Link to="/eventos" component={RouterLink} underline="none" variant="h4">
              Eventos
            </Link>
          </Item>
        </form>
      </Item>
    </Dashboard>
  );
});

export default ProfilePage;
