import api from './api';
import BaseService from './BaseService';

/**
 * Classe que irá ter todas as funcionalidades sobre autenticação de um usuário,
 * seja usuário padrão ou admin.
 */
class AuthService extends BaseService {
  constructor() {
    super('user_admin');
    this.TOKEN_KEY = 'token_user';
  }

  async userIsAdmin() {
    return await api.get(`${this.baseURL}`);
  }

  isAuthenticated() {
    return sessionStorage.getItem(this.TOKEN_KEY) !== null;
  }

  getToken() {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  login(token) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  logout() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}

export default new AuthService();
