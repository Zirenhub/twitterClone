import { doc, increment, writeBatch } from 'firebase/firestore';
import { db } from '../../Firebase';

const unfollowProfile = async (profileID, userID) => {
  if (profileID && userID) {
    const profileRef = doc(db, 'users', profileID);
    const userRef = doc(db, 'users', userID);
    const userFollowingRef = doc(userRef, 'following', profileID);
    const profileFollowerRef = doc(profileRef, 'followers', userID);

    const batch = writeBatch(db);

    try {
      batch.delete(profileFollowerRef);
      batch.delete(userFollowingRef);
      batch.update(profileRef, {
        numFollowers: increment(-1),
      });
      batch.update(userRef, {
        numFollowing: increment(-1),
      });
      await batch.commit();

      return true;
    } catch (error) {
      console.log(error);
    }
  }
};

export default unfollowProfile;
