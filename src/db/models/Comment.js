
import BaseModel from './BaseModel';

export default class Comment extends BaseModel {
  constructor(comment) {
    super('comments', comment);
  }

  add() {
    return super.add();
  }

}
