import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const sendChatRequest = async (profileID, userID, userDisplayName) => {
  if (profileID && userID) {
    const requestRef = doc(db, 'users', profileID, 'chatRequests', userID);
    const requestSnap = await getDoc(requestRef);

    if (!requestSnap.exists()) {
      try {
        await setDoc(requestRef, {
          userName: userDisplayName,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export default sendChatRequest;
