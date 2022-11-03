import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import getUserInfo from '../ProfilePage/getUserInfo';

const getAllTweets = async () => {
  const returnData = [];

  const querySnapshot = await getDocs(collection(db, 'posts'));

  for (const doc of querySnapshot.docs) {
    const rawData = doc.data();
    const dataArr = Object.entries(rawData);
    const userInfo = await getUserInfo(doc.id);

    dataArr.forEach((tweet) => {
      const tweetArr = Object.values(tweet);
      const key = tweetArr[0];
      const dataTweet = tweetArr[1].tweet;
      const date = tweetArr[1].firestoreDate.toDate();

      returnData.push({
        key: key,
        tweet: dataTweet,
        date: date,
        user: userInfo,
      });
    });
  }

  return returnData;
};

export default getAllTweets;
