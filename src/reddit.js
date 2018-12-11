import fetch from 'node-fetch';
import fs from 'fs';

async function auth() {
  const CLIENT_ID = process.env.CLIENT_ID;
  const RESPONSE_TYPE = 'code';
  const RANDOM_STRING = 'foobarzoo';
  const REDIRECT_URI = 'http//localhost:4444/authorize_callback';
  const DURATION = 'temporary';
  const SCOPE_STRING = 'read';
  const url = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&
    state=${RANDOM_STRING}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE_STRING}`;

  try {
    const response = await fetch(url);
    console.log('response', response);
  } catch (err) {
    console.log('err', err);
  }
}

// auth();
async function get() {
  const r = await fetch('https://www.reddit.com/r/bitcoin/hot/.json');
  const json = await r.json();
  console.log('r', JSON.stringify(json));
  fs.writeFileSync('./bitcoin.json', JSON.stringify(json));
}

get();
