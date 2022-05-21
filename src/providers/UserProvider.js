import React, { useEffect } from 'react';
import { useLocalObservable } from 'mobx-react';

import AuthStore from '../stores/AuthStore';
import ConfigUtilsStore from '../stores/ConfigUtilsStore';

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const userStore = useLocalObservable(() => AuthStore);

  useEffect(() => {
    AuthStore.getUser();
    ConfigUtilsStore.getAllConfigs();
  }, []);

  return <UserContext.Provider value={userStore}>{children}</UserContext.Provider>;
};

export const useUserStore = () => React.useContext(UserContext);
