import BaseService from './BaseService';

class ClientService extends BaseService {
  constructor() {
    super('users');
  }
}

export default new ClientService();
