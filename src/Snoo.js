import Snoowrap from 'snoowrap';
import Snoostorm from 'snoostorm';

require('dotenv').config();

export default class Snoo {
  constructor() {
    const options = {
      userAgent: 'reddit-bot-example-node',
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      username: process.env.REDDIT_USER,
      password: process.env.REDDIT_PASS,
    };

    this.snoowrap = new Snoowrap(options);
    this.client = new Snoostorm(this.snoowrap);
    this.streamOpts = {
      subreddit: 'bitcoin',
      results: 25,
    };

  }

  getSnoowrap() {
    return this.snoowrap;
  }

  getCommentStream() {
    return this.client.CommentStream(this.streamOpts);
  }

}
