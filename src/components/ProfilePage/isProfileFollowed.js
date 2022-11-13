import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const isProfileFollowed = async (profileID, userID) => {
  if (profileID && userID) {
    const profileRef = doc(db, 'users', profileID);
    const userRef = doc(profileRef, 'followers', userID);

    const isFollowing = await getDoc(userRef);

    if (isFollowing.exists()) {
      return true;
    }

    return false;
  }
};

export default isProfileFollowed;
