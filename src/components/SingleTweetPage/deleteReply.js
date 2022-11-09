import { doc, updateDoc, increment, deleteDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const deleteReply = async (replyOwnerID, replyKey, tweetKey) => {
  const replyOwnerRef = doc(db, 'users', replyOwnerID);
  const tweetRef = doc(db, 'posts', tweetKey);

  try {
    await deleteDoc(doc(db, 'posts', replyKey));
    await updateDoc(replyOwnerRef, {
      tweetsNum: increment(-1),
    });
    await updateDoc(tweetRef, {
      numOfComments: increment(-1),
    });
  } catch (error) {
    console.log(error);
  }
};

export default deleteReply;
