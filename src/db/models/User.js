

import { aql } from 'arangojs';
import BaseModel from './BaseModel';
import DB from '../index';
import { log } from '../../utils/logger';

export default class User extends BaseModel {
  constructor(username) {
    super('users', { username });
    this.username = username;
  }

  add() {
    return super.add();
  }

  async delete() {
    const user = await User.getUserByName(this.username);

    if (user !== undefined) {
      log('deleting user', user);
      return DB.removeFromCollection('users', user._id);
    }
  }

  async addIfNotExists() {
    const user = await User.getUserByName(this.username);
    if (user === undefined) {
      const newuser = super.add();

      return newuser;
    }

    return user;
  }

  static async getUserByName(name) {
    const query = aql`
      FOR user IN users
      FILTER user.username == ${name}
      RETURN user
    `;
    const users = await DB.query(query);
    log('users', name, users);
    return users.length > 0 ? users[0] : undefined;
  }
}
