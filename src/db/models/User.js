

import { aql } from 'arangojs';
import BaseModel from './BaseModel';
import DB from '../index';
import { log } from '../../utils/logger';


export default class User extends BaseModel {
  constructor(username) {
    super('users', username);
    this.username = username;
  }


  add() {
    return super.add();
  }

  static addUser(username) {
    log('adding user', username);
    return DB.insertIntoCollection('users', { username });
  }

  async addIfNotExists() {
    const user = await User.getUserByName(this.username);
    if (user === undefined) {
      const newuser = await User.addUser(this.username);

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
