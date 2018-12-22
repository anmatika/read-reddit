

import DB from '../index';
import { log } from '../../utils/logger';

export default class BaseEdgeModel {
  constructor(collectionName, data) {
    this.collectionName = collectionName;
    this.data = data;

  }

  add() {
    return DB.insertIntoEdges(this.collectionName, this.data);
  }
}
