import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const getUserMessages = async (profileID, userID) => {
  if (profileID && userID) {
    const chatRef = doc(db, 'chats', `${userID}_${profileID}`);
    const chatSnap = await getDoc(chatRef);

    if (chatSnap.exists()) {
      console.log(chatSnap.data());
    }
  }
};

export default getUserMessages;
