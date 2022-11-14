import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';

const getProfileReplies = async (profileID) => {
  if (profileID) {
    const returnData = [];
    const repliesQuery = query(
      collection(db, 'posts'),
      where('userID', '==', profileID),
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

export default getProfileReplies;
