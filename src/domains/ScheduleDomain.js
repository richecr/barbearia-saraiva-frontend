import { action, makeObservable, observable } from 'mobx';
import { formatFieldPhone } from '../utils/utils';

import DomainBase from './DomainBase';

class ScheduleDomain extends DomainBase {
  email = '';
  barber_name = '';
  barber_telephone = '';

  constructor() {
    super();
    makeObservable(this, {
      setUpdate: action,
      email: observable,
      barber_name: observable,
      barber_telephone: observable
    });
  }

  setUpdate(key, newValue) {
    this[key] = newValue;
  }

  getBackendObject() {
    const schedule = this;
    schedule.barber_telephone = formatFieldPhone(this.barber_telephone);
    return schedule;
  }
}

export default ScheduleDomain;
