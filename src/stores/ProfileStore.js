import moment from 'moment';
import { action, makeObservable, runInAction } from 'mobx';

import ProfileService from '../services/ProfileService';
import { RegisterStore } from './RegisterStore';

class ProfileStore extends RegisterStore {
  constructor() {
    super();
    makeObservable(this, {
      update: action
    });
  }

  async update(cbSuccess, cbFail) {
    try {
      await ProfileService.update(this.user.getBackendObject());
      if (cbSuccess) {
        cbSuccess();
      }
    } catch (error) {
      const error_response = error?.response;
      cbFail(error_response.data.message);
    }
  }

  async getUser(cbFail) {
    try {
      const response = await ProfileService.get();
      runInAction(() => {
        this.user.birthday = moment(new Date(response.data.birthday));
        this.user.name = response.data.name;
        this.user.email = response.data.email;
        this.user.telephone = response.data.telephone;
        response.data.notification_email ?? this.user.notifications.push('email');
        response.data.notification_whatsapp ?? this.user.notifications.push('whatsapp');
      });
    } catch (error) {
      const error_response = error?.response;
      cbFail(error_response.data.message);
    }
  }
}

export default new ProfileStore();
