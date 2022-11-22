import { doc, increment, writeBatch } from 'firebase/firestore';
import getUserInfo from '../ProfilePage/getProfileInfo';
import { db } from '../../Firebase';

const likeTweet = async (tweet, userID) => {
  if (tweet && userID) {
    const tweetRef = doc(db, 'posts', tweet);
    const likesRef = doc(tweetRef, 'likes', userID);

    // can get userName from user auth itself however
    // i also need followers and following
    // to show on hover over user profile...
    const { userName, numFollowers, numFollowing } = await getUserInfo(userID);

    const batch = writeBatch(db);

    try {
      batch.set(likesRef, {
        userName: userName,
        numFollowers: numFollowers,
        numFollowing: numFollowing,
        userID: userID,
      });
      batch.update(tweetRef, {
        numOfLikes: increment(1),
      });
      await batch.commit();
      // firestore cloud functions are a possibility

      return true;
    } catch (error) {
      console.log(error);
    }
  }
};

export default likeTweet;
