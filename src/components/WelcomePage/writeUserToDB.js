import { doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../Firebase';

const writeUserToDB = async (userID, displayName) => {
  const key = uuidv4();
  const batch = writeBatch(db);

  const userRef = doc(db, 'users', userID);
  const usernameRef = doc(db, 'usernames', displayName);

  try {
    batch.set(userRef, {
      userName: displayName,
      key: key,
      firestoreDate: serverTimestamp(),
      tweetsNum: 0,
      numFollowers: 0,
      numFollowing: 0,
    });
    batch.set(usernameRef, {
      uid: userID,
    });
    await batch.commit();

    return true;
  } catch (error) {
    console.log(error);
  }
};

export default writeUserToDB;
