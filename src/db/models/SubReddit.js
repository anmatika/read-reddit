
import { aql } from 'arangojs';
import DB from '../index';
import BaseModel from './BaseModel';

export default class SubReddit extends BaseModel {
  constructor(name) {
    super('subReddit', { name });
    this.name = name;
  }

  async addIfNotExists() {
    const subReddit = await this.get();
    if (subReddit === undefined) {
      const newSubReddit = super.add();

      return newSubReddit;
    }

    return subReddit;
  }

  get() {
    return this.getByName(this.name);
  }

  async getByName(value) {
    const query = aql`
      FOR o IN subReddit 
      FILTER o.name == ${value}
      RETURN o
    `;
    const entries = await DB.query(query);
    return entries.length > 0 ? entries[0] : undefined;
  }
}
