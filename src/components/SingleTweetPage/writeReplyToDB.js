import {
  doc,
  increment,
  updateDoc,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../Firebase';
import formatFetchedTweets from '../../utils/formatFetchedTweets';
import getUserInfo from '../ProfilePage/getUserInfo';

const writeReplyToDB = async (reply, replyOwnerID, tweetOwnerID, tweetKey) => {
  const key = uuidv4();
  const replySubCol = doc(db, 'posts', replyOwnerID, 'replies', key);
  const replyOwnerRef = doc(db, 'users', replyOwnerID);
  const tweetOwnerPosts = doc(db, 'posts', tweetOwnerID);
  // const likesRef = collection(tweetOwnerRef, 'likes');
  // const retweetsRef = collection(tweetOwnerRef, 'retweets');

  const userInfo = await getUserInfo(replyOwnerID);

  const replyData = {
    [tweetKey]: {
      key: key,
      tweet: reply,
      firestoreDate: Timestamp.fromDate(new Date()),
      numOfLikes: 0,
      numOfComments: 0,
      numOfRetweets: 0,
      user: userInfo,
    },
  };

  try {
    await setDoc(replySubCol, {
      key: key,
      tweet: reply,
      firestoreDate: Timestamp.fromDate(new Date()),
      numOfLikes: 0,
      numOfComments: 0,
      numOfRetweets: 0,
      user: userInfo,
      replyingTo: tweetKey,
    });
    await updateDoc(replyOwnerRef, {
      tweetsNum: increment(1),
    });
    await updateDoc(tweetOwnerPosts, {
      // [tweetKey]: { numOfComments: increment(1) },
      [`${tweetKey}.numOfComments`]: increment(1),
    });
  } catch (error) {
    console.log(error);
  } finally {
    const replyDataArr = Object.entries(replyData);
    const fomratedData = formatFetchedTweets(replyDataArr[0]);
    return fomratedData;
  }
};

export default writeReplyToDB;
