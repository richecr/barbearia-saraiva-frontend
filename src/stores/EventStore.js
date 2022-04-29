import moment from 'moment';
import { configure, makeObservable, observable, runInAction } from 'mobx';

import IndexStore from './IndexStore';
import EventDomain from '../domains/EventDomain';
import EventService from '../services/EventService';
import ScheduleService from '../services/ScheduleService';
import TypeOperationService from '../services/TypeOperationService';

configure({ enforceActions: 'observed' });
class EventStore extends IndexStore {
  data = [];
  service = EventService;
  domain = new EventDomain();
  filters = {
    dt_start: null
  };

  options = [];
  schedules = [];
  types_services = [];
  schedules_free = [];

  constructor() {
    super();
    makeObservable(this, {
      options: observable,
      schedules: observable,
      types_services: observable,
      schedules_free: observable
    });
  }

  getFiltersFormat() {
    const filters = {};
    Object.keys(this.filters).forEach((key) => {
      if (key === 'dt_start' && this.filters[key] !== null) {
        filters[key] = this.filters[key].format('YYYY-MM-DD');
      }
    });

    return filters;
  }

  async findById(id, cbFail) {
    try {
      const response = await EventService.findById(id);
      const data = response.data;
      const service = this.types_services.filter((service) => service.label === data.type_service);
      runInAction(() => {
        this.domain.barber = data.schedule_id;
        this.domain.date_start = moment(new Date(data.date_hour_start));
        this.domain.time_start = moment.utc(this.domain.date_start).utcOffset(0);
        this.domain.service = service[0].value;
      });
    } catch (error) {
      const error_response = error?.response;
      cbFail(error_response?.data.message || '');
    }
  }

  async findAllSchedules(cbSuccess) {
    try {
      const response = await ScheduleService.findAll();
      runInAction(() => {
        this.schedules = response.data;
        this.options = this.schedules.map((schedule) => {
          return {
            value: schedule.id,
            label: schedule.barber_name
          };
        });
        console.log(this.options);
      });
      if (cbSuccess) {
        cbSuccess();
      }
    } catch (error) {
      const error_response = error?.response;
      console.error(error_response.data.message);
    }
  }

  async findAllServices(cbSuccess) {
    try {
      const response = await TypeOperationService.findAll();
      runInAction(() => {
        let data = response.data;
        this.types_services = data.map((service) => {
          return {
            value: service.id,
            label: service.event_name
          };
        });
      });
      if (cbSuccess) {
        cbSuccess();
      }
    } catch (error) {
      const error_response = error?.response;
      console.error(error_response.data.message);
    }
  }

  async findSchedulesTime() {
    console.log();
    const response = await ScheduleService.findAllScheduleFree(
      this.domain.barber,
      this.domain.date_start.format('YYYY-MM-DD')
    );
    runInAction(() => {
      this.schedules_free = response.data;
    });
  }

  clear() {
    this.domain.reset();
  }
}

export default new EventStore();
