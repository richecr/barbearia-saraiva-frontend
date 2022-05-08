import moment from 'moment';
import { action, makeObservable, observable } from 'mobx';

import DomainBase from './DomainBase';

class EventDomain extends DomainBase {
  barber = null;
  service = null;
  date_start = null;
  time_start = null;

  constructor() {
    super();
    makeObservable(this, {
      barber: observable,
      service: observable,
      date_start: observable,
      time_start: observable,
      reset: action
    });
  }

  getBackendObject() {
    const date_start = this.date_start.format('DD/MM/YYYY');
    const time_start = this.time_start.format('HH:mm');

    const date_time = moment(date_start + 'T' + time_start + 'Z', 'DD/MM/YYYYTHH:mmZ');
    const data = {
      schedule_id: this.barber,
      date_hour_start: date_time.toDate(),
      type_service: Number(this.service)
    };

    return data;
  }

  reset() {
    this.barber = null;
    this.service = null;
    this.date_start = null;
    this.time_start = null;
    this.resetErrors();
  }
}

export default EventDomain;
