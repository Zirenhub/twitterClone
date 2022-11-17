import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const getTweet = async (tweet) => {
  if (tweet) {
    const postRef = doc(db, 'posts', tweet);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const rawData = postSnap.data();
      rawData.date = rawData.firestoreDate.toDate();

      return rawData;
    } else {
      return false;
    }
  }
};

export default getTweet;
