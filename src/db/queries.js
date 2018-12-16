import { aql } from 'arangojs';
import DB from './index';
import { log } from '../utils/logger';

export async function getChannelByName(name) {
  const query = aql`
      FOR channel IN channels
      FILTER channel.name == ${name}
      RETURN channel
    `;
  const channels = await DB.query(query);
  return channels.length > 0 ? channels[0] : undefined;
}

export async function getPostsByChannel(channelName) {
  const channel = await getChannelByName(channelName);
  if (!channel) {
    return [];
  }

  const query = aql`
    FOR p IN posts
    FILTER p.channelKey == ${channel._key}
    SORT p.created
    FOR u in users
        FILTER p.author == u._key
        RETURN { "id": p._id, "username": u.username, "message": p.body }
    `;

  return DB.query(query);
}

export async function hasChannel(name) {
  const channels = await getChannelByName(name);
  return channels !== undefined;
}

export async function getUserByName(name) {
  const query = aql`
      FOR user IN users
      FILTER user.username == ${name}
      RETURN user
    `;
  const users = await DB.query(query);
  log('users', name, users);
  return users.length > 0 ? users[0] : undefined;
}

export async function hasUser(username) {
  const user = await getUserByName(username);
  log('user', user, username);
  const retval = user !== undefined;
  log('retval', retval, username);
  return retval;
}
