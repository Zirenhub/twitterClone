import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const getUserTweets = async (userID) => {
  const returnData = {};

  if (userID) {
    const docRef = doc(db, 'posts', userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      returnData.tweets = docSnap.data();
      Object.keys(returnData.tweets).forEach((key) => {
        returnData.tweets[key].firestoreDate = returnData.tweets[
          key
        ].firestoreDate
          .toDate()
          .toString();
        return key;
      });
    }
    return returnData;
  }
};

export default getUserTweets;
