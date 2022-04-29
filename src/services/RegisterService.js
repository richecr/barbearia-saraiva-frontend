import BaseService from './BaseService';

class RegisterService extends BaseService {
  constructor() {
    super('users');
  }
}

export default new RegisterService();
