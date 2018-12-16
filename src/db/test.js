import 'dotenv/config';
import { Database, aql } from 'arangojs';
import DB from './index';
import { getNodesByChannel, getMessagesByUsername, getEdgesByChannel, getChannelsByName } from './queries';
import { log, warning, success } from '../utils/logger';
import { addUser, deleteUser } from './manipulation';

(async function () {
  log('my log entry', 'foo', 'bar');
  log('my log entry', 'foo', 'bar');
  // await DB.createCollection("messages");
  // await DB.createCollection("channels");
  // await DB.createEdgeCollection("belongsToChannel");

  // await addUser('Antti');
  // await addUser('Matan');
  // await deleteUser('Antti');
  // DB.removeFromCollection('users', 'users/992843');

  //   const messages = await getMessagesByUsername("antti");
  //   log(success("messages :"), messages);

  //   const channel = await getChannelsByName("main");
  //   log(warning("main channel :"), channel);

  //   const theChannel = await getChannelsByName("theChannel");
  //   log(warning("theChannel :"), theChannel);
  // } catch (err) {
  //   console.error("error", err.response ? err.response.body : err);
  // }
  // await addUser('anon');
}());

async function truncateCollections() {
  await DB.truncateCollection('messages');
  await DB.truncateCollection('channels');
  await DB.truncateEdgeCollection('belongsToChannel');
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
