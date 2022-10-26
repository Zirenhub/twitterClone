import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';

const getAllTweets = async () => {
  const returnData = [];

  const querySnapshot = await getDocs(collection(db, 'posts'));

  querySnapshot.forEach((doc) => {
    returnData.push({
      ...doc.data(),
    });
  });

  return returnData;
};

export default getAllTweets;
