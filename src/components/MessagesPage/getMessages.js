import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';

const getMessages = async (profileID, userID) => {
  if (profileID && userID) {
    //profile = fdw ----- user = mta
    const chatSnapshow = await getDocs(
      collection(db, 'chats', userID, profileID)
    );

    const chatData = [];

    chatSnapshow.forEach((doc) => {
      chatData.push(doc.data());
    });

    return chatData;
  }
};

export default getMessages;
