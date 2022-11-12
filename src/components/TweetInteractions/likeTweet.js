import { doc, increment, writeBatch } from 'firebase/firestore';
import getUserInfo from '../ProfilePage/getUserInfo';
import { db } from '../../Firebase';

const likeTweet = async (tweet, userID) => {
  const tweetRef = doc(db, 'posts', tweet);
  const likesRef = doc(tweetRef, 'likes', userID);

  const { userName, numFollowers, numFollowing } = await getUserInfo(userID);

  const batch = writeBatch(db);

  try {
    batch.update(tweetRef, {
      numOfLikes: increment(1),
    });
    batch.set(likesRef, {
      userName: userName,
      numFollowers: numFollowers,
      numFollowing: numFollowing,
      userID: userID,
    });
    await batch.commit();

    return true;
  } catch (error) {
    console.log(error);
  }
};

export default likeTweet;
