
import BaseEdgeModel from './BaseEdgeModel';

export default class CommentsOfUser extends BaseEdgeModel {
  constructor(user, comment) {
    super('commentsOfUser', { _from: comment._id, _to: user._id });

    this.user = user;
    this.comment = comment;
  }

  add() {
    return super.add();
  }
}
