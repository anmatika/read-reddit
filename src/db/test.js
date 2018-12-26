import 'dotenv/config';
import { Database, aql } from 'arangojs';
import util from 'util';
import DB from './index';

import { log, warning, success } from '../utils/logger';
import { addUser, deleteUser } from './manipulation';
import User from './models/User';
import Comment from './models/Comment';
import CommentEdge from './models/CommentEdge';

// truncateCollections();
// getGraph();
// getCommentEdges();
getCommentsOfUser();

async function truncateCollections() {
  const u = new User('foo');
  await u.truncate();
  const c = new Comment('foo');
  await c.truncate();
  const ce = new CommentEdge('foo');
  await ce.truncate();
}

async function getCommentsOfUser() {
  const user = new User('TravisWash');
  const comments = await user.getComments();
  console.log('comments', comments);
}

async function getGraph() {
  const graphObj = DB.getGraph('foo');
  const graph = await graphObj.get();
  console.log('graph foo', util.inspect(graph.edgeDefinitions));
  const collection = graphObj.vertexCollection('vertices');
  console.log('vertexCollection', collection);
  const vertexcollections = await graphObj.listVertexCollections(true);
  console.log('vertextCollections list', vertexcollections);
}

async function getCommentEdges() {
  const c = new CommentEdge();
  const edges = await c.getAll();
  console.log('edges', edges);
}

async function createMessagesToChannelMain() {
  const channel = await DB.insertIntoCollection('channels', { name: 'main' });
  const msg1 = await DB.insertIntoCollection('messages', { username: 'antti', text: 'hello' });
  const msg2 = await DB.insertIntoCollection('messages', { username: 'antti', text: 'hello!' });
  const msg3 = await DB.insertIntoCollection('messages', { username: 'antti', text: 'hello!1111!' });
  await DB.insertIntoEdges('belongsToChannel', { _from: msg1._id, _to: channel._id });
  await DB.insertIntoEdges('belongsToChannel', { _from: msg2._id, _to: channel._id });
  await DB.insertIntoEdges('belongsToChannel', { _from: msg3._id, _to: channel._id });
}
async function createMessagesToChannelMyChannel() {
  const channel = await DB.insertIntoCollection('channels', { name: 'theChannel' });
  const msg1 = await DB.insertIntoCollection('messages', { username: 'matan', text: 'foobar' });
  const msg2 = await DB.insertIntoCollection('messages', { username: 'matan', text: 'yeahyeah' });
  const msg3 = await DB.insertIntoCollection('messages', { username: 'matan', text: 'ok' });
  await DB.insertIntoEdges('belongsToChannel', { _from: msg1._id, _to: channel._id });
  await DB.insertIntoEdges('belongsToChannel', { _from: msg2._id, _to: channel._id });
  await DB.insertIntoEdges('belongsToChannel', { _from: msg3._id, _to: channel._id });
}
