import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';

const getProfileFollowers = async (profileID) => {
  if (profileID) {
    const returnData = [];
    try {
      const followersSnap = await getDocs(
        collection(db, 'users', profileID, 'followers')
      );

      followersSnap.forEach((doc) => {
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

export default getProfileFollowers;
