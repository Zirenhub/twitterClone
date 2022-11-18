import { doc, Timestamp, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../Firebase';

const writeMessage = async (userID, profileID, message, userDisplayName) => {
  if (userID && profileID && message) {
    const key = uuidv4();
    const chatRef = doc(db, 'users', userID, 'chats', profileID);

    const messageData = {
      [key]: {
        sender: userDisplayName,
        message: message,
        date: Timestamp.fromDate(new Date()),
        key: key,
      },
    };

    try {
      await setDoc(chatRef, messageData, { merge: true });

      return messageData;
    } catch (error) {
      console.log(error);
    }
  }
};

export default writeMessage;
