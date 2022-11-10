import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';

const getUserTweets = async (userID) => {
  if (userID) {
    const returnData = [];
    const postsQuery = query(
      collection(db, 'posts'),
      where('userID', '==', userID),
      where('replyingTo', '==', null)
    );
    const postsSnap = await getDocs(postsQuery);

    postsSnap.forEach((doc) => {
      const rawData = doc.data();
      rawData.date = rawData.firestoreDate.toDate();
      returnData.push(rawData);
    });

    return returnData;
  }
};

export default getUserTweets;
