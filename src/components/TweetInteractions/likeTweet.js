import { doc, updateDoc, increment, setDoc } from 'firebase/firestore';
import getUserInfo from '../ProfilePage/getUserInfo';
import { db } from '../../Firebase';

const likeTweet = async (tweet, userID) => {
  const tweetRef = doc(db, 'posts', tweet);
  const likesRef = doc(tweetRef, 'likes', userID);

  const userInfo = await getUserInfo(userID);

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
};

export default likeTweet;
