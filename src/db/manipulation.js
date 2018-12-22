import DB from './index';
import {
  getUserByName,
} from './queries';
import { log } from '../utils/logger';
import Comment from './models/Comment';
import User from './models/User';

export async function addUser(username) {
  log('adding user', username);
  return DB.insertIntoCollection('users', { username });
}

export async function deleteUser(username) {
  const user = await getUserByName(username);

  if (user !== undefined) {
    log('deleting user', user);
    return DB.removeFromCollection('users', user._id);
  }
}

export async function addUserIfNotExists(username) {
  const user = await getUserByName(username);
  if (user === undefined) {
    const newuser = await addUser(username);

    return newuser;
  }

  return user;
}

function addComment(comment) {
  return DB.insertIntoCollection('comments', comment);
}

function addCommentsOfUserEdge(commentId, userId) {
  log(`insering into edges CommentsOfUser ${commentId} ${userId} `);
  return DB.insertIntoEdges('CommentsOfUser', { _from: commentId, _to: userId });
}

export async function insertCommentAndUser(comment, username) {
  const c = new Comment(comment);
  const commentRes = await c.add();
  console.log('comments insert', commentRes);
  const u = new User(username);
  const userRes = await u.addIfNotExists();
  console.log('user res', userRes);
  const edgeRes = await addCommentsOfUserEdge(commentRes._id, userRes._id);
  console.log('edgeRes', edgeRes);
  return userRes;

}


