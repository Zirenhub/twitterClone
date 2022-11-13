import { doc, increment, writeBatch } from 'firebase/firestore';
import { db } from '../../Firebase';

const unfollowUser = async (profileID, userID) => {
  if (profileID && userID) {
    const profileRef = doc(db, 'users', profileID);
    const userRef = doc(profileRef, 'followers', userID);

    const batch = writeBatch(db);

    try {
      batch.delete(userRef);
      batch.update(profileRef, {
        numFollowers: increment(-1),
      });
      await batch.commit();

      return true;
    } catch (error) {
      console.log(error);
    }
  }
};

export default unfollowUser;
