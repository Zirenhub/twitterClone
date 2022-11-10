import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';

const getReplies = async (tweet) => {
  if (tweet) {
    const repliesQuery = query(
      collection(db, 'posts'),
      where('replyingTo', '==', tweet)
    );
    const repliesSnap = await getDocs(repliesQuery);

    const returnData = [];
    repliesSnap.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data());
      const rawData = doc.data();
      rawData.date = rawData.firestoreDate.toDate();
      returnData.push(rawData);
    });
    return returnData;
  }
};

export default getReplies;
