import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const getUserInfo = async (userID) => {
  const returnData = {};

  if (userID) {
    const docRef = doc(db, 'users', userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      returnData.joinDate = docSnap.data().firestoreDate.toDate();
      returnData.tweetsNum = docSnap.data().tweetsNum;
      returnData.numFollowing = docSnap.data().numFollowing;
      returnData.numFollowers = docSnap.data().numFollowers;
      returnData.userName = docSnap.data().userName;
    }
    return returnData;
  }
};

export default getUserInfo;
