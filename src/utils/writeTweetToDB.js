import {
  doc,
  increment,
  serverTimestamp,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import getUserInfo from '../components/ProfilePage/getUserInfo';
import { db } from '../Firebase';

const writeTweetToDB = async (userID, tweet) => {
  const key = uuidv4();
  const postsRef = doc(db, 'posts', key);
  const userInfoRef = doc(db, 'users', userID);

  const userInfo = await getUserInfo(userID);

  try {
    await setDoc(postsRef, {
      key: key,
      tweet: tweet,
      firestoreDate: serverTimestamp(),
      numOfLikes: 0,
      numOfComments: 0,
      numOfRetweets: 0,
      userID: userID,
      user: userInfo,
    });
    await updateDoc(userInfoRef, {
      tweetsNum: increment(1),
    });
  } catch (error) {
    console.log(error);
  }
};

export default writeTweetToDB;
