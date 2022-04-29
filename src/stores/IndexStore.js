import { action, configure, makeObservable, observable, runInAction } from 'mobx';

configure({ enforceActions: 'observed' });

class IndexStore {
  data = [];
  domain = null;
  service = null;
  filters = {};

  constructor() {
    makeObservable(this, {
      data: observable,
      domain: observable,
      filters: observable,
      service: observable,
      clear: action,
      updateAttribute: action
    });
  }

  updateAttribute(attribute, value) {
    this.domain[attribute] = value;
  }

  updateFilters(name, value) {
    this.filters[name] = value;
  }

  clear() {
    this.domain = null;
  }

  getFiltersFormat() {
    return this.filters;
  }

  async findAll(cbSuccess, cbFail) {
    try {
      const response = await this.service.findAll(this.getFiltersFormat());
      runInAction(() => {
        this.data = response.data;
      });
      if (cbSuccess) {
        cbSuccess();
      }
    } catch (error) {
      const error_response = error?.response;
      cbFail(error_response?.data.message || '');
    }
  }

  async findById(id, cbFail) {
    try {
      const response = await this.service.findById(id);
      const data = response.data;
      runInAction(() => {
        this.domain.setUpdate('barber_telephone', data.barber_telephone);
        this.domain.setUpdate('barber_name', data.barber_name);
        this.domain.setUpdate('email', data.email);
      });
    } catch (error) {
      const error_response = error?.response;
      cbFail(error_response?.data.message || '');
    }
  }

  async save(cbSuccess, cbFail) {
    try {
      await this.service.create(this.domain.getBackendObject());
      if (cbSuccess) {
        cbSuccess();
      }
    } catch (error) {
      const error_response = error?.response;
      cbFail(error_response?.data.message || '');
    }
  }

  async update(id, cbSuccess, cbFail) {
    try {
      await this.service.update(id, this.domain.getBackendObject());
      if (cbSuccess) {
        cbSuccess();
      }
    } catch (error) {
      const error_response = error?.response;
      cbFail(error_response?.data.message || '');
    }
  }

  async delete(id, cbFail) {
    try {
      await this.service.delete(id);
    } catch (error) {
      const error_response = error?.response;
      cbFail(error_response?.data.message || '');
    }
  }
}

export default IndexStore;
