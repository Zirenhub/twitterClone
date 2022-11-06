import {
  doc,
  deleteField,
  updateDoc,
  increment,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../Firebase';

const deleteTweet = async (user, tweet) => {
  const tweetRef = doc(db, 'posts', user);
  const repliesRef = doc(tweetRef, 'replies', tweet);
  const userInfoRef = doc(db, 'users', user);

  try {
    await updateDoc(tweetRef, {
      [tweet]: deleteField(),
    });
    await deleteDoc(repliesRef);
    await updateDoc(userInfoRef, {
      tweetsNum: increment(-1),
    });
  } catch (error) {
    console.log(error);
  }
};

export default deleteTweet;
