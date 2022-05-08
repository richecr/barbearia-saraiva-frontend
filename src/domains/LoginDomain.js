import { makeAutoObservable } from 'mobx';

class LoginDomain {
  email = '';
  password = '';

  constructor() {
    makeAutoObservable(this);
  }

  reset() {
    this.email = '';
    this.password = '';
  }
}

export default LoginDomain;
