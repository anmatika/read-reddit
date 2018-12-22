import Comment from './models/Comment';
import User from './models/User';
import CommentsOfUser from './models/CommentsOfUser';
import SubReddit from './models/SubReddit';

// function addCommentsOfUserEdge(commentId, userId) {
//   log(`insering into edges CommentsOfUser ${commentId} ${userId} `);
//   return DB.insertIntoEdges('CommentsOfUser', { _from: commentId, _to: userId });
// }

export async function insertCommentAndUser(comment, username) {
  const c = new Comment(comment);
  const commentRes = await c.add();
  console.log('comments insert', commentRes);
  const u = new User(username);
  const userRes = await u.addIfNotExists();
  console.log('user res', userRes);
  const cu = new CommentsOfUser(userRes, commentRes);
  const edgeRes = await cu.add();
  // const edgeRes = await addCommentsOfUserEdge(commentRes._id, userRes._id);
  console.log('edgeRes', edgeRes);
  const s = new SubReddit('bitcoin');
  const subReddit = await s.get();
  console.log('subreddit', subReddit);


  return userRes;

}


