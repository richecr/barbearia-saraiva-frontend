import React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import { useUserStore } from './providers/UserProvider';

// pages.
import NotFoundPage from './pages/NotFound/NotFoundPage';
import PrivateRoutes from './components/commons/PrivateRoutes';
import NotAuthorizedPage from './pages/NotAuthorized/NotAuthorizedPage';

// Login and Register pages.
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';

// Schedules: list and form pages.
import ScheduleListPage from './pages/Schedule/ScheduleListPage';
import ScheduleFormPage from './pages/Schedule/ScheduleFormPage';

// Events: list and form pages.
import EventListPage from './pages/Event/EventListPage';
import EventFormPage from './pages/Event/EventFormPage';

// Service page.
import ServicePage from './pages/Service';

// Profile page.
import ProfilePage from './pages/Profile/ProfilePage';

const Router = observer(() => {
  const UserStore = useUserStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="entrar"
          element={UserStore.isAuthenticated ? <Navigate to="/eventos" /> : <LoginPage />}
        />
        <Route
          path="cadastro"
          element={UserStore.isAuthenticated ? <Navigate to="/eventos" /> : <RegisterPage />}
        />
        <Route
          path="agendas"
          element={
            <PrivateRoutes>
              <RouterOutlet />
            </PrivateRoutes>
          }>
          <Route index element={<ScheduleListPage />} />
          <Route path="novo" element={<ScheduleFormPage />} />
          <Route path="edite/:id" element={<ScheduleFormPage />} />
        </Route>

        <Route
          path="eventos"
          element={
            <PrivateRoutes>
              <RouterOutlet />
            </PrivateRoutes>
          }>
          <Route index element={<EventListPage />} />
          <Route path="novo" element={<EventFormPage />} />
          <Route path="edite/:id" element={<EventFormPage />} />
        </Route>

        <Route
          path="perfil"
          element={
            <PrivateRoutes>
              <RouterOutlet />
            </PrivateRoutes>
          }>
          <Route index element={<ProfilePage />} />
        </Route>

        <Route path="servicos" element={<ServicePage />} />
        <Route path="not_authorized" element={<NotAuthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
});

function RouterOutlet() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Router;
