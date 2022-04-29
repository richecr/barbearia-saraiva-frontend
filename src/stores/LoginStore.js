import { action, makeAutoObservable } from 'mobx';

import LoginDomain from '../domains/LoginDomain';

class LoginStore {
  user_login = new LoginDomain();

  constructor() {
    makeAutoObservable(this, {
      updateAttribute: action
    });
  }

  updateAttribute(attribute, value) {
    this.user_login[attribute] = value;
  }
}

export default new LoginStore();
