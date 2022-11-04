import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const getTweet = async (userID, tweet) => {
  if (userID && tweet) {
    const docRef = doc(db, 'posts', userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let returnData = null;

      const rawData = docSnap.data();
      const dataArr = Object.entries(rawData);

      dataArr.forEach((fetchedTweet) => {
        const fetchedKey = fetchedTweet[0];
        if (fetchedKey === tweet) {
          returnData = { key: fetchedKey, tweet: fetchedTweet[1] };
        }
      });
      return returnData;
    }
  }
};

export default getTweet;
