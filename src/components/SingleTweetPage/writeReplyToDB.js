import {
  doc,
  increment,
  updateDoc,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../Firebase';
import formatFetchedTweets from '../../utils/formatFetchedTweets';
import getUserInfo from '../ProfilePage/getUserInfo';

const writeReplyToDB = async (reply, replyOwnerID, tweetOwnerID, tweetKey) => {
  const replyOwnerRef = doc(db, 'users', replyOwnerID);
  const tweetOwnerRef = doc(db, 'posts', tweetOwnerID);
  const repliesRef = doc(tweetOwnerRef, 'replies', tweetKey);
  // const likesRef = collection(tweetOwnerRef, 'likes');
  // const retweetsRef = collection(tweetOwnerRef, 'retweets');

  const key = uuidv4();
  const userInfo = await getUserInfo(replyOwnerID);

  const replyData = {
    [key]: {
      tweet: reply,
      firestoreDate: Timestamp.fromDate(new Date()),
      replyingTo: tweetKey,
      numberOfLikes: 0,
      numberOfComments: 0,
      numberOfRetweets: 0,
      user: userInfo,
    },
  };

  try {
    await setDoc(repliesRef, replyData, { merge: true });
    await updateDoc(replyOwnerRef, {
      tweetsNum: increment(1),
    });
    await setDoc(
      tweetOwnerRef,
      {
        [tweetKey]: { numberOfComments: increment(1) },
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  } finally {
    const replyDataArr = Object.entries(replyData);
    console.log(replyDataArr[0]);
    const fomratedData = formatFetchedTweets(replyDataArr[0]);
    return fomratedData;
  }
};

export default writeReplyToDB;
