import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const getProfileInfo = async (profileID) => {
  if (profileID) {
    const returnData = {};

    const profileRef = doc(db, 'users', profileID);
    const profileSnap = await getDoc(profileRef);

    if (profileSnap.exists()) {
      returnData.joinDate = profileSnap.data().firestoreDate.toDate();
      returnData.tweetsNum = profileSnap.data().tweetsNum;
      returnData.numFollowing = profileSnap.data().numFollowing;
      returnData.numFollowers = profileSnap.data().numFollowers;
      returnData.userName = profileSnap.data().userName;
    }
    return returnData;
  }
};

export default getProfileInfo;
