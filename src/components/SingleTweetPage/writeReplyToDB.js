import {
  doc,
  increment,
  updateDoc,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../Firebase';
import getUserInfo from '../ProfilePage/getUserInfo';

const writeReplyToDB = async (reply, replyOwnerID, tweetKey) => {
  const key = uuidv4();
  const replyUserRef = doc(db, 'users', replyOwnerID);
  const postsRef = doc(db, 'posts', key);
  const tweetRef = doc(db, 'posts', tweetKey);
  // const likesRef = collection(tweetOwnerRef, 'likes');
  // const retweetsRef = collection(tweetOwnerRef, 'retweets');

  const userInfo = await getUserInfo(replyOwnerID);

  const replyData = {
    key: key,
    tweet: reply,
    firestoreDate: Timestamp.fromDate(new Date()),
    numOfLikes: 0,
    numOfComments: 0,
    numOfRetweets: 0,
    user: userInfo,
    userID: replyOwnerID,
    replyingTo: tweetKey,
  };

  try {
    await setDoc(postsRef, replyData);
    await updateDoc(replyUserRef, {
      tweetsNum: increment(1),
    });
    await updateDoc(tweetRef, {
      numOfComments: increment(1),
    });
    replyData.date = replyData.firestoreDate.toDate();
    return replyData;
  } catch (error) {
    console.log(error);
  }
};

export default writeReplyToDB;
