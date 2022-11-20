import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';

const getChatRequests = async (userID) => {
  if (userID) {
    const userRef = await getDocs(
      collection(db, 'users', userID, 'chatRequests')
    );

    const requestData = [];

    userRef.forEach((doc) => {
      const modifiedData = doc.data();
      modifiedData.id = doc.id;
      modifiedData.status = 'request';
      requestData.push(modifiedData);
    });

    return requestData;
  }
};

export default getChatRequests;
