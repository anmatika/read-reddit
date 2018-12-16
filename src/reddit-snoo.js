import chalk from 'chalk';
import moment from 'moment';
import { addCommentAndUser } from './db/manipulation';
import Snoo from './Snoo';

const snoo = new Snoo();
// On comment, perform whatever logic you want to do

snoo.getCommentStream().on('comment', async(c) => {
  const comment = {
    body: c.body,
    subreddit_name_prefixed: c.subreddit_name_prefixed,
    link_title: c.link_title,
    link_author: c.link_author,
    link_permalink: c.link_permalink,
    link_url: c.link_url,
    author: c.author.name,
    author_fullname: c.author_fullname,
    score: c.score,
    created_utc: c.created_utc,
    created_utc_date: moment.unix(c.created_utc).utc(),
    num_comments: c.num_comments,
  };

  console.log(chalk.blue('Comment from stream'), comment);

  const commnst = await getUserComments(comment.author);

  console.log(chalk.green(`User ${comment.author} comments`), commnst.length);
  addCommentAndUser(comment, comment.author);
});


const getUserComments = (username) => {
  const user = snoo.getSnoowrap().getUser(username);
  console.log(chalk.green('User'), user);

  return new Promise((resolve) => {
    user.getComments().then((c) => {
      const cmments = c.map(x => ({
        body: x.body,
        link_permalink: x.link_permalink,
        ups: x.ups,
        downs: x.downs,
        score: x.score,
        subreddit: x.subreddit_name_prefixed,
        likes: x.likes,
        num_reports: x.num_reports,
        link_url: x.link_url,
      }));
      resolve(cmments);
    });
  });
};
