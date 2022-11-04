import {
  doc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../Firebase';

const writeReplyToDB = async (reply, replyOwnerID, tweetOwnerID) => {
  const key = uuidv4();
  const replyOwnerRef = doc(db, 'users', replyOwnerID);
  const tweetOwnerRef = doc(db, 'posts', tweetOwnerID);

  try {
    await setDoc(
      replyOwnerRef,
      {
        replies: {
          reply: reply,
          key: [key],
          firestoreDate: serverTimestamp(),
          replies: {},
          likes: {},
          retweets: {},
        },
      },
      { merge: true }
    );
    await updateDoc(replyOwnerRef, {
      tweetsNum: increment(1),
    });
  } catch (error) {
    console.log(error);
  }
};

export default writeReplyToDB;
