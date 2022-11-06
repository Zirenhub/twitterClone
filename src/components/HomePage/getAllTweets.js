import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import formatFetchedTweets from '../../utils/formatFetchedTweets';
import getUserInfo from '../ProfilePage/getUserInfo';

const getAllTweets = async () => {
  const returnData = [];

  const querySnapshot = await getDocs(collection(db, 'posts'));

  for (const doc of querySnapshot.docs) {
    const rawData = doc.data();
    const dataArr = Object.entries(rawData);
    const userInfo = await getUserInfo(doc.id);

    dataArr.forEach((tweet) => {
      const tweetsArr = Object.values(tweet);
      const formatedTweets = formatFetchedTweets(tweetsArr);
      formatedTweets.user = userInfo;

      returnData.push(formatedTweets);
    });
  }

  return returnData;
};

export default getAllTweets;
