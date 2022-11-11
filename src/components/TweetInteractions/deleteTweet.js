import { doc, updateDoc, increment, deleteDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const deleteTweet = async (userID, tweet) => {
  const tweetRef = doc(db, 'posts', tweet);
  const userInfoRef = doc(db, 'users', userID);

  try {
    await deleteDoc(tweetRef);
    await updateDoc(userInfoRef, {
      tweetsNum: increment(-1),
    });
  } catch (error) {
    console.log(error);
  }
};

export default deleteTweet;
