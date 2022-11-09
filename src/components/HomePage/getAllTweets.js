import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';

const getAllTweets = async () => {
  const returnData = [];

  const querySnapshot = await getDocs(collection(db, 'posts'));

  for (const doc of querySnapshot.docs) {
    const rawData = doc.data();
    rawData.date = rawData.firestoreDate.toDate();
    returnData.push(rawData);
  }

  return returnData;
};

export default getAllTweets;
