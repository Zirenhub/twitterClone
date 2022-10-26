import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../Firebase';

const writeUserToDB = async (userID, displayName) => {
  const key = uuidv4();

  try {
    await setDoc(doc(db, 'users', userID), {
      userName: displayName,
      key: key,
      firestoreDate: serverTimestamp(),
      tweetsNum: 0,
      followers: {},
      following: {},
    });
  } catch (error) {
    console.log(error);
  }
};

export default writeUserToDB;
