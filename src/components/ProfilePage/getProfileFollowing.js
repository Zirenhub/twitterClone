import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';

const getProfileFollowing = async (profileID) => {
  if (profileID) {
    const returnData = [];
    try {
      const followingSnap = await getDocs(
        collection(db, 'users', profileID, 'following')
      );

      followingSnap.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        returnData.push(data);
      });

      return returnData;
    } catch (error) {
      console.log(error);
    }
  }
};

export default getProfileFollowing;
