import api from './api';
import BaseService from './BaseService';

class ScheduleService extends BaseService {
  constructor() {
    super('schedules');
  }

  async findAllScheduleFree(scheduleId, dateStart) {
    return await api.get(`${this.baseURL}/free?schedule=${scheduleId}&date_start=${dateStart}`);
  }
}

export default new ScheduleService();
