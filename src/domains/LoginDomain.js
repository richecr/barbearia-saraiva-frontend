import { makeAutoObservable } from 'mobx';

class LoginDomain {
  email = '';
  password = '';

  constructor() {
    makeAutoObservable(this);
  }
}

export default LoginDomain;
