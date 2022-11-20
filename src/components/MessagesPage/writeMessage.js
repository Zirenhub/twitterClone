import { doc, Timestamp, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../Firebase';

const writeMessage = async (userID, profile, message, userDisplayName) => {
  if (userID && profile && message && userDisplayName) {
    const key = uuidv4();
    const messagesRef = doc(db, 'users', userID, 'messages', key);

    const messageData = {
      userName: userDisplayName,
      sendTo: profile.id,
      message: message,
      date: Timestamp.fromDate(new Date()),
      key: key,
    };

    try {
      await setDoc(messagesRef, messageData);

      return messageData;
    } catch (error) {
      console.log(error);
    }
  }
};

export default writeMessage;
