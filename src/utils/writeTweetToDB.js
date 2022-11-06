import {
  doc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../Firebase';

const writeTweetToDB = async (userID, tweet) => {
  const key = uuidv4();
  const userPostsRef = doc(db, 'posts', userID);
  const userInfoRef = doc(db, 'users', userID);

  try {
    await setDoc(
      userPostsRef,
      {
        [key]: {
          tweet: tweet,
          firestoreDate: serverTimestamp(),
          numberOfLikes: 0,
          numberOfComments: 0,
          numberOfRetweets: 0,
        },
      },
      { merge: true }
    );
    await updateDoc(userInfoRef, {
      tweetsNum: increment(1),
    });
  } catch (error) {
    console.log(error);
  }
};

export default writeTweetToDB;
