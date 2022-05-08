import { action, makeObservable, observable } from 'mobx';

import UserDomain from '../domains/UserDomain';
import RegisterService from '../services/RegisterService';

export class RegisterStore {
  user = new UserDomain();
  optionsNotification = [
    { label: 'Whatsapp', value: 'whatsapp' },
    { label: 'E-mail', value: 'email' }
  ];

  constructor() {
    makeObservable(this, {
      updateAttribute: action,
      onNotificationChange: action,
      save: action,
      user: observable,
      optionsNotification: observable
    });
  }

  updateAttribute(attribute, value) {
    this.user[attribute] = value;
  }

  onNotificationChange(list) {
    this.user.notifications = list;
  }

  async save(cbSuccess, cbFail) {
    try {
      await RegisterService.create(this.user.getBackendObject());
      if (cbSuccess) {
        cbSuccess();
      }
    } catch (error) {
      const error_response = error?.response;
      cbFail(error_response?.data.message || '');
    }
  }

  clear() {
    this.user.reset();
  }
}

export default new RegisterStore();
