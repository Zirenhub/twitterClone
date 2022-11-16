import { doc, Timestamp, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../Firebase';

const writeMessage = async (userID, profileID, message, userDisplayName) => {
  if (userID && profileID && message) {
    const chatRef = doc(db, 'chats', userID, profileID);
    const key = uuidv4();

    const messageData = {
      [key]: {
        name: userDisplayName,
        message: message,
        date: Timestamp.fromDate(new Date()),
        key: key,
      },
    };
    try {
      await setDoc(
        chatRef,
        {
          messages: { ...messageData },
          participants: [userID, profileID],
        },
        { merge: true }
      );

      return messageData;
    } catch (error) {
      console.log(error);
    }
  }
};

export default writeMessage;
