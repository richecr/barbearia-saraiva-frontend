import { action, makeObservable, observable } from 'mobx';

class DomainBase {
  errors = {};

  constructor() {
    makeObservable(this, {
      errors: observable,
      validate: action,
      getBackendObject: action
    });
  }

  validate(field) {
    if (!this.errors.hasOwnProperty(field) && !this.errors[field]) {
      if (this[field] && this[field] !== undefined) {
        this.errors[field] = false;
      } else {
        this.errors[field] = 'Campo obrigatório';
      }
    } else {
      if (this[field] && this[field] !== undefined) {
        this.errors[field] = false;
      } else {
        this.errors[field] = 'Campo obrigatório';
      }
    }
  }

  getBackendObject() {
    return this.errors;
  }
}

export default DomainBase;
