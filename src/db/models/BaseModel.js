
import DB from '../index';

export default class BaseModel {
  constructor(collectionName, data) {
    this.collectionName = collectionName;
    this.data = data;

  }

  add() {
    return DB.insertIntoCollection(this.collectionName, this.data);
  }
}
