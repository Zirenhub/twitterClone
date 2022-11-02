import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';

const getUserID = async (username) => {
  if (username) {
    const docRef = doc(db, 'usernames', username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
  }
};

export default getUserID;
