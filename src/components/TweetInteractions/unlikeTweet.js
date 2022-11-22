import { doc, increment, writeBatch } from 'firebase/firestore';
import { db } from '../../Firebase';

const unlikeTweet = async (tweet, userID) => {
  if (tweet && userID) {
    const tweetRef = doc(db, 'posts', tweet);
    const likesRef = doc(tweetRef, 'likes', userID);

    const batch = writeBatch(db);

    try {
      batch.delete(likesRef);
      batch.update(tweetRef, {
        numOfLikes: increment(-1),
      });
      await batch.commit();

      return true;
    } catch (error) {
      console.log(error);
    }
  }
};

export default unlikeTweet;
