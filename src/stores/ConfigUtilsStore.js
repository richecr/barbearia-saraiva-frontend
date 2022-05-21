import { action, makeAutoObservable, observable, runInAction } from 'mobx';

import ConfigUtilsService from '../services/ConfigUtilsService';

/**
 * Classe responsável por verificar autenticação do usuário.
 */
class ConfigUtilsStore {
  configs = {};

  constructor() {
    makeAutoObservable(this, {
      configs: observable
    });
  }

  async getAllConfigs() {
    try {
      const response = await ConfigUtilsService.get();
      runInAction(() => (this.configs = response.data));
    } catch (error) {
      console.error('Algum erro ocorreu!');
    }
  }
}

export default new ConfigUtilsStore();
