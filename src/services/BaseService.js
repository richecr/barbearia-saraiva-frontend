import api from './api';

/**
 * Classe que irá servir como base para os outros services.
 *
 * **OBS:** Métodos comuns entre os services devem ser implementados aqui.
 */
class BaseService {
  constructor(url) {
    this.baseURL = url;
  }

  async create(domain) {
    return await api.post(`${this.baseURL}`, domain);
  }

  async findAll(filters = {}) {
    let queries = '';
    const lengthFilters = Object.keys(filters).length;
    if (lengthFilters > 0) {
      queries += '?';
      Object.keys(filters).forEach((key, idx) => {
        queries += `${key}=${filters[key]}`;
        if (idx < lengthFilters - 1) {
          queries += ' and ';
        }
      });
    }
    return await api.get(`${this.baseURL}${queries}`);
  }

  async findById(id) {
    return await api.get(`${this.baseURL}/${id}`);
  }

  async update(id, domain) {
    return await api.put(`${this.baseURL}/${id}`, domain);
  }

  async delete(id) {
    return await api.delete(`${this.baseURL}/${id}`);
  }
}

export default BaseService;
