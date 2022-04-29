import React from 'react';
import { observer } from 'mobx-react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../providers/UserProvider';

const PrivateRoutes = observer(() => {
  const UserStore = useUserStore();

  return UserStore.isAuthenticated ? <Outlet /> : <Navigate to="/entrar" />;
});

export default PrivateRoutes;
