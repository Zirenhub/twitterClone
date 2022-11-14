import { doc, increment, writeBatch } from 'firebase/firestore';
import { db } from '../../Firebase';
import getUserInfo from './getProfileInfo';

const followProfile = async (profile, userID) => {
  if (profile && userID) {
    const profileID = profile.ID;

    const profileRef = doc(db, 'users', profileID);
    const userRef = doc(db, 'users', userID);
    const profileFollowersRef = doc(profileRef, 'followers', userID);
    const userFollowingRef = doc(userRef, 'following', profileID);

    const { userName, numFollowers, numFollowing } = await getUserInfo(userID);

    const batch = writeBatch(db);

    try {
      batch.set(profileFollowersRef, {
        userName,
        numFollowers,
        numFollowing,
      });
      batch.set(userFollowingRef, {
        profileID,
      });
      batch.update(profileRef, {
        numFollowers: increment(1),
      });
      batch.update(userRef, {
        numFollowing: increment(1),
      });
      await batch.commit();

      return true;
    } catch (error) {
      console.log(error);
    }
  }
};

export default followProfile;
