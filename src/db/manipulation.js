import DB from './index';
import {
  getUserByName,
} from './queries';
import { log } from '../utils/logger';

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

export async function addCommentAndUser(comment, username) {
  await DB.insertIntoCollection('comments', comment);
  return addUserIfNotExists(username);

}


