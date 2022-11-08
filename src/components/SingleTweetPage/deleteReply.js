import { doc, updateDoc, increment, deleteDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const deleteReply = async (replyOwnerID, replyKey) => {
  const replyOwnerRef = doc(db, 'users', replyOwnerID);

  try {
    await deleteDoc(doc(db, 'posts', replyOwnerID, 'replies', replyKey));
    await updateDoc(replyOwnerRef, {
      tweetsNum: increment(-1),
    });
  } catch (error) {
    console.log(error);
  }
};

export default deleteReply;
