import { doc, increment, writeBatch } from 'firebase/firestore';
import { db } from '../../Firebase';

const deleteTweet = async (userID, tweet) => {
  const tweetRef = doc(db, 'posts', tweet);
  const userInfoRef = doc(db, 'users', userID);

  const batch = writeBatch(db);

  try {
    batch.delete(tweetRef);
    batch.update(userInfoRef, {
      tweetsNum: increment(-1),
    });
    await batch.commit();

    return true;
  } catch (error) {
    console.log(error);
  }
};

export default deleteTweet;
