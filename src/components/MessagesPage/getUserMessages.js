import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const getUserMessages = async (profileID, userID) => {
  if (profileID && userID) {
    const chatRef = doc(db, 'users', userID, 'chats', profileID);

    const chatSnap = await getDoc(chatRef);

    if (chatSnap.exists()) {
      return chatSnap.data();
    } else {
      return false;
    }
  }
};

export default getUserMessages;
