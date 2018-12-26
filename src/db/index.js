import 'dotenv/config';
import { Database, aql } from 'arangojs';
import { log } from '../utils/logger';

class DB {
  constructor() {
    try {
      log('initializing database');
      log('env', process.env.NODE_ENV);
      log('databaseurl_prod', process.env.DATABASE_URL_PROD);
      log('databaseurl_dev', process.env.DATABASE_URL_DEV);
      this.db = new Database({
        url: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL_DEV,
      });
      this.db.useDatabase('reddit');
      this.db.useBasicAuth('root', process.env.DATABASE_PASSWORD_ROOT);
    } catch (err) {
      log('database login failed', err);
    }
  }

  getInstance() {
    return this.db;
  }

  createCollection(name) {
    return this.db.collection(name).create();
  }

  truncateCollection(name) {
    return this.db.collection(name).truncate();
  }

  truncateEdgeCollection(name) {
    return this.db.edgeCollection(name).truncate();
  }

  createEdgeCollection(name) {
    return this.db.edgeCollection(name).create();
  }

  insertIntoCollection(name, data) {
    // log('insertintocollection', name, data);
    log('insertintocollection');
    const collection = this.db.collection(name);
    return collection.save({ ...data, created: new Date() });
  }

  removeFromCollection(name, id) {
    const collection = this.db.collection(name);
    log('removing user', name, id);
    return collection.remove(id);
  }

  async query(query) {
    const cursor = await this.db.query(query);
    return cursor.all();
  }

  insertIntoEdges(name, data) {
    const collection = this.db.edgeCollection(name);

    console.log('inserting into edgeCollection ', collection, data);
    return collection.save({ ...data, created: new Date() });
  }

  getGraph(name) {
    return this.db.graph(name);
  }
}
const db = new DB();

export default db;
