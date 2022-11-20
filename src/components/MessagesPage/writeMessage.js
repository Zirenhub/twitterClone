import { doc, Timestamp, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../Firebase';

const writeMessage = async (userID, profile, message, userDisplayName) => {
  if (userID && profile && message && userDisplayName) {
    const key = uuidv4();
    let chatRef;
    if (profile.status !== 'request') {
      chatRef = doc(db, 'users', userID, 'chats', key);
    } else {
      chatRef = doc(db, 'users', profile.id, 'chats', key);
    }

    const messageData = {
      senderUserName: userDisplayName,
      sendTo: profile.id,
      senderID: userID,
      message: message,
      date: Timestamp.fromDate(new Date()),
      key: key,
    };

    try {
      await setDoc(chatRef, messageData);

      return messageData;
    } catch (error) {
      console.log(error);
    }
  }
};

export default writeMessage;
