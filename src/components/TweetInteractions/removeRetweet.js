import { doc, increment, writeBatch } from 'firebase/firestore';
import { db } from '../../Firebase';

const removeRetweet = async (tweet, userID) => {
  if (tweet && userID) {
    const tweetRef = doc(db, 'posts', tweet);
    const retweetRef = doc(tweetRef, 'retweets', userID);

    const batch = writeBatch(db);

    try {
      batch.delete(retweetRef);
      batch.update(tweetRef, {
        numOfRetweets: increment(-1),
      });
      await batch.commit();

      return true;
    } catch (error) {
      console.log(error);
    }
  }
};

export default removeRetweet;
