import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';

const getMessages = async (profile, userID) => {
  if (profile && userID) {
    const userChatRef = query(
      collection(db, 'users', userID, 'messages'),
      where('sendTo', '==', profile.id),
      orderBy('date')
    );
    const profileChatRef = query(
      collection(db, 'users', profile.id, 'messages'),
      where('sendTo', '==', userID),
      orderBy('date')
    );

    const userChatSnap = await getDocs(userChatRef);
    const profileChatSnap = await getDocs(profileChatRef);

    const returnData = [];
    userChatSnap.forEach((doc) => {
      returnData.push(doc.data());
    });
    profileChatSnap.forEach((doc) => {
      returnData.push(doc.data());
    });

    if (returnData) {
      returnData.sort((a, b) => a.date.toDate() - b.date.toDate());
    }

    return returnData;
  }
};

export default getMessages;
