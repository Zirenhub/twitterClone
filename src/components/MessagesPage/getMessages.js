import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';

const getMessages = async (profile, userID) => {
  if (profile && userID) {
    let chatRef;
    if (profile.status !== 'request') {
      chatRef = query(
        collection(db, 'users', userID, 'chats'),
        where('sendTo', '==', profile.id),
        orderBy('date')
      );
    } else {
      chatRef = query(
        collection(db, 'users', profile.id, 'chats'),
        where('sendTo', '==', userID),
        orderBy('date')
      );
    }

    const chatSnap = await getDocs(chatRef);

    const returnData = [];
    chatSnap.forEach((doc) => {
      const data = doc.data();
      returnData.push(data);
    });

    return returnData;
  }
};

export default getMessages;
