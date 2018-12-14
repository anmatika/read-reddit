require('dotenv').config();
import Snoowrap from 'snoowrap';
import Snoostorm from 'snoostorm';
import chalk from 'chalk';
const options = {
  userAgent: 'reddit-bot-example-node',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS,
};

const r = new Snoowrap(options);
const client = new Snoostorm(r);
const streamOpts = {
  subreddit: 'bitcoin',
  results: 25,
};
const comments = client.CommentStream(streamOpts);

// On comment, perform whatever logic you want to do
comments.on('comment', comment => {
  console.log(comment);
  const user = r.getUser(comment.author.name);
  console.log(chalk.green('User'), user);
  // user.getOverview().then(o => {
  //   console.log(chalk.green('User.Overview', JSON.stringify(o)));
  // });
  user.getTrophies().then(console.log);
});
