import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const getUserInfo = async (username) => {
  const returnData = {};

  // user takes a second to load if you enter
  // directly from /profile, check if username is available
  // don't do anything until username is available
  if (username) {
    const docRef = doc(db, 'users', username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      returnData.joinDate = docSnap.data().firestoreDate.toDate();
      returnData.tweetsNum = docSnap.data().tweetsNum;
      returnData.following = docSnap.data().following;
      returnData.followers = docSnap.data().followers;
      returnData.userName = docSnap.data().userName;
    }
    return returnData;
  }
};

export default getUserInfo;
