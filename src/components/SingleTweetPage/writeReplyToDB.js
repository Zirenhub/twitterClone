import {
  doc,
  increment,
  serverTimestamp,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../Firebase';

const writeReplyToDB = async (reply, replyOwnerID, tweetOwnerID, tweetKey) => {
  const replyOwnerRef = doc(db, 'users', replyOwnerID);
  const tweetOwnerRef = doc(db, 'posts', tweetOwnerID);
  const repliesRef = doc(tweetOwnerRef, 'replies', tweetKey);
  // const likesRef = collection(tweetOwnerRef, 'likes');
  // const retweetsRef = collection(tweetOwnerRef, 'retweets');

  const key = uuidv4();

  try {
    await setDoc(
      repliesRef,
      {
        [key]: {
          reply: reply,
          firestoreDate: serverTimestamp(),
          replyOwner: replyOwnerID,
          replyingTo: tweetKey,
          numberOfLikes: 0,
          numberOfComments: 0,
          numberOfRetweets: 0,
        },
      },
      { merge: true }
    );
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
  }
};

export default writeReplyToDB;
