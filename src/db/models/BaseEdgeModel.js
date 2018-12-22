import DB from '../index';

export default class BaseEdgeModel {
  constructor(collectionName, data) {
    this.collectionName = collectionName;
    this.data = data;

  }

  add() {
    return DB.insertIntoEdges(this.collectionName, this.data);
  }

  truncate() {
    return DB.truncateEdgeCollection(this.collectionName);
  }
}
