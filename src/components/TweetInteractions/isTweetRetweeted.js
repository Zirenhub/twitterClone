import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const isTweetRetweeted = async (tweet, userID) => {
  if (tweet && userID) {
    const tweetRef = doc(db, 'posts', tweet);
    const retweetRef = doc(tweetRef, 'retweets', userID);

    const isAlreadyLiked = await getDoc(retweetRef);

    if (isAlreadyLiked.exists()) {
      return true;
    }

    return false;
  }
};

export default isTweetRetweeted;
