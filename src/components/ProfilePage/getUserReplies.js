import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';

const getUserReplies = async (userID) => {
  if (userID) {
    const returnData = [];
    const repliesQuery = query(
      collection(db, 'posts'),
      where('userID', '==', userID),
      where('replyingTo', '!=', null)
    );
    const repliesSnap = await getDocs(repliesQuery);

    repliesSnap.forEach((doc) => {
      const rawData = doc.data();
      rawData.date = rawData.firestoreDate.toDate();
      returnData.push(rawData);
    });

    return returnData;
  }
};

export default getUserReplies;
