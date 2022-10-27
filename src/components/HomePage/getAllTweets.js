import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import getUserInfo from '../ProfilePage/getUserInfo';

const getAllTweets = async () => {
  const returnData = [];

  const querySnapshot = await getDocs(collection(db, 'posts'));

  querySnapshot.forEach(async (doc) => {
    const data = doc.data();
    const arrayFromData = Object.entries(data);
    arrayFromData.forEach((tweet) => {
      const tweetContent = tweet[1];
      // const date = tweetContent.firestoreDate.toDate().toString().slice(0, 21);
      const date = tweetContent.firestoreDate.toDate();
      tweetContent.firestoreDate = date;
    });

    const userInfo = await getUserInfo(doc.id);
    const convertedData = Object.entries(data).map((entry) => {
      return { [entry[0]]: entry[1], userInfo };
    });

    returnData.push(convertedData);
  });

  return returnData;
};

export default getAllTweets;
