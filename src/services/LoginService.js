import BaseService from './BaseService';

class LoginService extends BaseService {
  constructor() {
    super('authenticate');
  }
}

export default new LoginService();
