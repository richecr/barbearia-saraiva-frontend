import { action, makeAutoObservable, runInAction } from 'mobx';

import AuthService from '../services/AuthService';
import LoginService from '../services/LoginService';
import ProfileService from '../services/ProfileService';
import RegisterService from '../services/RegisterService';
import ConfigUtilsService from '../services/ConfigUtilsService';

/**
 * Classe responsável por verificar autenticação do usuário.
 */
class AuthStore {
  isAdmin = false;
  isAuthenticated = false;
  profile = {};

  constructor() {
    makeAutoObservable(this, {
      login: action,
      logout: action,
      getIsAdmin: action,
      userIsAdmin: action,
      verifyIsAuthenticated: action
    });
  }

  async getIsAdmin() {
    try {
      const response = await AuthService.userIsAdmin();
      this.isAdmin = response.data.is_admin;
    } catch (error) {
      console.error('Algum erro ocorreu!');
    }
  }

  async getUser(userId = null) {
    try {
      let response = {};
      if (userId === null) {
        response = await ProfileService.get();
      } else {
        response = await RegisterService.findById(userId);
      }

      const configs = await ConfigUtilsService.get();
      runInAction(() => {
        this.profile = response.data;
        this.profile.services_current =
          this.profile.number_services % configs.data.qnt_services_to_discount;
      });
    } catch (error) {
      console.error('Algum erro ocorreu!');
    }
  }

  async userIsAdmin(cbFail) {
    try {
      const response = await AuthService.userIsAdmin();
      const user_admin = response.data.is_admin;
      this.isAdmin = user_admin;
      if (cbFail && !user_admin) {
        cbFail('você não tem permissão para acessar essa página!');
      }
    } catch (error) {
      cbFail('você não tem permissão para acessar essa página!');
    }
  }

  async login(user, cbSuccess, cbFail) {
    try {
      const response = await LoginService.create(user);
      AuthService.login(response.data.token);
      this.verifyIsAuthenticated();
      if (cbSuccess) {
        cbSuccess();
      }
    } catch (error) {
      cbFail('Verifique as suas credenciais.');
    }
  }

  logout(cbSuccess, cbFail) {
    try {
      AuthService.logout();
      this.verifyIsAuthenticated();
      if (cbSuccess) {
        cbSuccess();
      }
    } catch (error) {
      const error_response = error?.response;
      cbFail(error_response?.data.message || '');
    }
  }

  verifyLogin() {
    const token = AuthService.getToken();
    return token;
  }

  verifyIsAuthenticated = () => {
    this.isAuthenticated = AuthService.isAuthenticated();
    return this.isAuthenticated;
  };
}

export default new AuthStore();
