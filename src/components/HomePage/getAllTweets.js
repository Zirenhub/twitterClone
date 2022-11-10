import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';

const getAllTweets = async () => {
  const postsQuery = query(
    collection(db, 'posts'),
    where('replyingTo', '==', null)
  );
  const postsSnap = await getDocs(postsQuery);

  const returnData = [];
  for (const doc of postsSnap.docs) {
    const rawData = doc.data();
    rawData.date = rawData.firestoreDate.toDate();
    returnData.push(rawData);
  }

  return returnData;
};

export default getAllTweets;
