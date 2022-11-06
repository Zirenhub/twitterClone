import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import formatFetchedTweets from '../../utils/formatFetchedTweets';

const getUserTweets = async (userID) => {
  const returnData = [];

  if (userID) {
    const docRef = doc(db, 'posts', userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const rawData = docSnap.data();
      const dataArr = Object.entries(rawData);

      dataArr.forEach((tweet) => {
        const tweetsArr = Object.values(tweet);
        const formatedTweets = formatFetchedTweets(tweetsArr);

        returnData.push(formatedTweets);
      });
    }

    return returnData;
  }
};

export default getUserTweets;
