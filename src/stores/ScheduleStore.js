import { configure } from 'mobx';

import IndexStore from './IndexStore';
import ScheduleDomain from '../domains/ScheduleDomain';
import ScheduleService from '../services/ScheduleService';
configure({ enforceActions: 'observed' });

class ScheduleStore extends IndexStore {
  domain = new ScheduleDomain();
  service = ScheduleService;

  clear() {
    this.domain = new ScheduleDomain();
  }
}

export default new ScheduleStore();
