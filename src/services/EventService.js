import BaseService from './BaseService';

class EventService extends BaseService {
  constructor() {
    super('events');
  }
}

export default new EventService();
