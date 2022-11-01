import { doc, deleteField, updateDoc, increment } from 'firebase/firestore';
import { db } from '../Firebase';

const deleteTweet = async (user, tweet) => {
  const tweetRef = doc(db, 'posts', user);
  const userInfoRef = doc(db, 'users', user);

  try {
    await updateDoc(tweetRef, {
      [tweet]: deleteField(),
    });
    await updateDoc(userInfoRef, {
      tweetsNum: increment(-1),
    });
  } catch (error) {
    console.log(error);
  }
};

export default deleteTweet;
