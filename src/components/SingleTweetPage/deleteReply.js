import { doc, increment, writeBatch } from 'firebase/firestore';
import { db } from '../../Firebase';

const deleteReply = async (replyOwnerID, replyKey, tweetKey) => {
  const replyOwnerRef = doc(db, 'users', replyOwnerID);
  const tweetRef = doc(db, 'posts', tweetKey);

  const batch = writeBatch(db);

  try {
    batch.delete(doc(db, 'posts', replyKey));
    batch.update(replyOwnerRef, {
      tweetsNum: increment(-1),
    });
    batch.update(tweetRef, {
      numOfComments: increment(-1),
    });
    await batch.commit();

    return true;
  } catch (error) {
    console.log(error);
  }
};

export default deleteReply;
