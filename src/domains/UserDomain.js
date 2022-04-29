import { makeObservable, observable } from 'mobx';
import { formatFieldPhone } from '../utils/utils';
import DomainBase from './DomainBase';

class UserDomain extends DomainBase {
  name = '';
  email = '';
  birthday = '';
  telephone = '';
  password = '';
  confirmPassword = '';
  notification_email = true;
  notification_whatsapp = true;
  notifications = ['whatsapp', 'email'];

  constructor() {
    super();
    makeObservable(this, {
      name: observable,
      email: observable,
      birthday: observable,
      telephone: observable,
      password: observable,
      confirmPassword: observable,
      notification_email: observable,
      notification_whatsapp: observable
    });
  }

  getBackendObject() {
    const user_backend = this;
    user_backend.telephone = formatFieldPhone(this.telephone);
    return user_backend;
  }
}

export default UserDomain;
