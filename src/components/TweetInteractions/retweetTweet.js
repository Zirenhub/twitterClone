import { doc, increment, writeBatch } from 'firebase/firestore';
import getUserInfo from '../ProfilePage/getProfileInfo';
import { db } from '../../Firebase';

const retweetTweet = async (tweet, userID) => {
  if (tweet && userID) {
    const tweetRef = doc(db, 'posts', tweet);
    const retweetsRef = doc(tweetRef, 'retweets', userID);

    const { userName, numFollowers, numFollowing } = await getUserInfo(userID);

    const batch = writeBatch(db);

    try {
      batch.set(retweetsRef, {
        userName: userName,
        numFollowers: numFollowers,
        numFollowing: numFollowing,
        userID: userID,
      });
      batch.update(tweetRef, {
        numOfRetweets: increment(1),
      });
      await batch.commit();

      return true;
    } catch (error) {
      console.log(error);
    }
  }
};

export default retweetTweet;
