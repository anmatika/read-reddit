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
comments.on('comment', c => {
  const comment = {
    subreddit_name_prefixed: c.subreddit_name_prefixed,
    link_title: c.link_title,
    link_author: c.link_author,
    link_permalink: c.link_permalink,
    link_url: c.link_url,
    author: c.author.name,
    author_fullname: c.author_fullname,
    body: c.body,
    score: c.score,
    created_utc: c.created_utc,
    num_comments: c.num_comments,
  };

  console.log(chalk.blue('Comment from stream'), comment);
  const user = r.getUser(comment.author);
  console.log(chalk.green('User'), user);

  user.getComments().then(c => {
    const comments = c.map(x => {
      return {
        body: x.body,
        link_permalink: x.link_permalink,
        ups: x.ups,
        downs: x.downs,
        score: x.score,
        subreddit: x.subreddit_name_prefixed,
        likes: x.likes,
        num_reports: x.num_reports,
        link_url: x.link_url,
      };
    });
    console.log(chalk.green(`User ${comment.author} comments`), comments);
  });
});
