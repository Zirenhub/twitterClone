import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const getReplies = async (userID, tweet) => {
  if (userID && tweet) {
    const postRef = doc(db, 'posts', userID);
    const repliesRef = doc(postRef, 'replies', tweet);
    const repliesSnap = await getDoc(repliesRef);

    const returnData = [];
    if (repliesSnap.exists()) {
      const rawData = repliesSnap.data();
      const dataArr = Object.entries(rawData);

      for (const reply of dataArr) {
        const [replyKey, replyData] = reply;
        const date = replyData.firestoreDate.toDate();
        const currentReply = replyData.reply;
        const replyOwner = replyData.replyOwner;
        //fix this user!
        returnData.push({
          key: replyKey,
          tweet: currentReply,
          date: date,
          user: replyOwner,
        });
      }
    }
    return returnData;
  }
};

export default getReplies;
