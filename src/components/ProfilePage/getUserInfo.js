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
      returnData.following = docSnap.data().following;
      returnData.followers = docSnap.data().followers;
      returnData.userName = docSnap.data().userName;
    }
    return returnData;
  }
};

export default getUserInfo;
