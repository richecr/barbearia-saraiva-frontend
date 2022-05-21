import api from './api';
import BaseService from './BaseService';

class ConfigUtilsService extends BaseService {
  constructor() {
    super('configs');
  }

  async get() {
    return await api.get(`${this.baseURL}`);
  }
}

export default new ConfigUtilsService();
