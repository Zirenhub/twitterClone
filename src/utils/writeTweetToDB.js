import {
  doc,
  increment,
  serverTimestamp,
  updateDoc,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import getUserInfo from '../components/ProfilePage/getUserInfo';
import { db } from '../Firebase';

const writeTweetToDB = async (userID, tweet) => {
  const key = uuidv4();
  const postsRef = doc(db, 'posts', key);
  const userInfoRef = doc(db, 'users', userID);

  const { userName, numFollowers, numFollowing } = await getUserInfo(userID);

  const tweetData = {
    key: key,
    tweet: tweet,
    firestoreDate: Timestamp.fromDate(new Date()),
    numOfLikes: 0,
    numOfComments: 0,
    numOfRetweets: 0,
    replyingTo: null,
    userID: userID,
    userName: userName,
    numFollowers: numFollowers,
    numFollowing: numFollowing,
  };

  try {
    await setDoc(postsRef, tweetData);
    await updateDoc(userInfoRef, {
      tweetsNum: increment(1),
    });
    tweetData.date = tweetData.firestoreDate.toDate();
    return tweetData;
  } catch (error) {
    console.log(error);
  }
};

export default writeTweetToDB;
