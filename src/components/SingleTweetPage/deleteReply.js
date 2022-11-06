import { doc, deleteField, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../Firebase';

const deletReply = async (tweetOwnerID, replyOwnerID, postKey, replyKey) => {
  const postRef = doc(db, 'posts', tweetOwnerID);
  const repliesRef = doc(postRef, 'replies', postKey);

  const replyOwnerInfoRef = doc(db, 'users', replyOwnerID);

  try {
    await updateDoc(repliesRef, {
      [replyKey]: deleteField(),
    });
    await updateDoc(replyOwnerInfoRef, {
      tweetsNum: increment(-1),
    });
  } catch (error) {
    console.log(error);
  }
};

export default deletReply;
