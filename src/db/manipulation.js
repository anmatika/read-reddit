import Comment from './models/Comment';
import User from './models/User';
import SubReddit from './models/SubReddit';
import CommentEdge from './models/CommentEdge';


export async function insertCommentAndUser(comment, username) {
  const c = new Comment(comment);
  const commentRes = await c.add();
  console.log('comments insert', commentRes);

  const u = new User(username);
  const userRes = await u.addIfNotExists();
  console.log('user res', userRes);

  const cu = new CommentEdge({ _from: commentRes._id, _to: userRes._id });
  const edgeRes = await cu.add();
  console.log('edgeRes', edgeRes);

  const s = new SubReddit('bitcoin');
  const subReddit = await s.get();
  console.log('subreddit', subReddit);

  const commentSubRedditEdge = new CommentEdge({ _from: commentRes._id, _to: subReddit._id });
  commentSubRedditEdge.add();


  return userRes;

}


