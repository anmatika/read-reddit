import { aql } from 'arangojs';
import DB from '../index';
import BaseEdgeModel from './BaseEdgeModel';

export default class CommentEdge extends BaseEdgeModel {
  constructor(edge) {
    super('commentEdges', edge);
  }

  add() {
    return super.add();
  }

  async getAll() {
    const query = aql`
      FOR o IN commentEdges 
      RETURN o
    `;
    const entries = await DB.query(query);
    return entries;
  }
}
