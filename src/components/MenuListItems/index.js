import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';

import { useUserStore } from '../../providers/UserProvider';

export function MenuListItems() {
  const navigate = useNavigate();
  const UserStore = useUserStore();

  return (
    <React.Fragment>
      {UserStore.isAdmin && (
        <ListItemButton onClick={(e) => navigate('/agendas')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Agendas" />
        </ListItemButton>
      )}
      <ListItemButton onClick={(e) => navigate('/eventos')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Eventos" />
      </ListItemButton>
      <ListItemButton onClick={(e) => navigate('/servicos')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Serviços" />
      </ListItemButton>
      <ListItemButton onClick={(e) => navigate('/perfil')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Meu Perfil" />
      </ListItemButton>
    </React.Fragment>
  );
}
