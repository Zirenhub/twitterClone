import { doc, updateDoc, increment, deleteDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const unlikeTweet = async (tweet, userID) => {
  const tweetRef = doc(db, 'posts', tweet);
  const likesRef = doc(tweetRef, 'likes', userID);

  try {
    await updateDoc(tweetRef, {
      numOfLikes: increment(-1),
    });
    await deleteDoc(likesRef);
    return true;
  } catch (error) {
    console.log(error);
  }
};

export default unlikeTweet;
