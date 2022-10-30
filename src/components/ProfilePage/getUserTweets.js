import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const getUserTweets = async (userID) => {
  const returnData = [];

  if (userID) {
    const docRef = doc(db, 'posts', userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const rawData = docSnap.data();
      const dataArr = Object.entries(rawData);

      dataArr.forEach((tweet) => {
        const formatedData = [];

        const tweetArr = Object.values(tweet);
        const key = tweetArr[0];
        const dataTweet = tweetArr[1].tweet;
        const date = tweetArr[1].firestoreDate.toDate().toString();

        formatedData[key] = {};
        formatedData[key].tweet = dataTweet;
        formatedData[key].date = date;

        returnData.push(formatedData);
      });
    }

    return returnData;
  }
};

export default getUserTweets;
