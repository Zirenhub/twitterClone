import {
  doc,
  updateDoc,
  increment,
  setDoc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';
import getUserInfo from '../components/ProfilePage/getUserInfo';
import { db } from '../Firebase';

const likeTweet = async (tweet, userID) => {
  const tweetRef = doc(db, 'posts', tweet);
  const likesRef = doc(tweetRef, 'likes', userID);

  const isAlreadyLiked = await getDoc(likesRef);

  const userInfo = await getUserInfo(userID);

  if (isAlreadyLiked.exists()) {
    try {
      await updateDoc(tweetRef, {
        numOfLikes: increment(-1),
      });
      await deleteDoc(likesRef);
      return false;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await updateDoc(tweetRef, {
        numOfLikes: increment(1),
      });
      await setDoc(likesRef, {
        userInfo,
        userID,
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  }
};

export default likeTweet;
