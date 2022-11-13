import { doc, increment, writeBatch } from 'firebase/firestore';
import { db } from '../../Firebase';
import getUserInfo from './getUserInfo';

const followUser = async (profileID, userID) => {
  if (profileID && userID) {
    const profileRef = doc(db, 'users', profileID);
    const userRef = doc(profileRef, 'followers', userID);

    const { userName, numFollowers, numFollowing } = await getUserInfo(userID);

    const batch = writeBatch(db);

    try {
      batch.set(userRef, {
        userName,
        numFollowers,
        numFollowing,
      });
      batch.update(profileRef, {
        numFollowers: increment(1),
      });
      await batch.commit();

      return true;
    } catch (error) {
      console.log(error);
    }
  }
};

export default followUser;
