import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const getUserInfo = async (userID) => {
  // user takes a second to load if you enter
  // directly from /profile, check if userID is available
  // don't do anything until userID is available

  const returnData = {};

  if (userID) {
    const docRef = doc(db, 'users', userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      returnData.joinDate = docSnap.data().joinDate;
      returnData.tweetsNum = docSnap.data().tweetsNum;
    }
    return returnData;
  }
};

export default getUserInfo;
