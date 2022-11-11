import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';

const isTweetIsLiked = async (tweet, userID) => {
  const tweetRef = doc(db, 'posts', tweet);
  const likesRef = doc(tweetRef, 'likes', userID);

  const isAlreadyLiked = await getDoc(likesRef);

  if (isAlreadyLiked.exists()) {
    return true;
  }

  return false;
};

export default isTweetIsLiked;
