import React from 'react';
import { useLocalObservable } from 'mobx-react';

import AuthStore from '../stores/AuthStore';

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const userStore = useLocalObservable(() => AuthStore);

  return <UserContext.Provider value={userStore}>{children}</UserContext.Provider>;
};

export const useUserStore = () => React.useContext(UserContext);
