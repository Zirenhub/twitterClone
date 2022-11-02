import { doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../Firebase';

const writeUserToDB = async (userID, displayName) => {
  const key = uuidv4();
  const batch = writeBatch(db);

  const userRef = doc(db, 'users', userID);
  const usernameRef = doc(db, 'usernames', displayName);

  try {
    // await setDoc(doc(db, 'users', userID), {
    //   userName: displayName,
    //   key: key,
    //   firestoreDate: serverTimestamp(),
    //   tweetsNum: 0,
    //   followers: {},
    //   following: {},
    // });
    // await setDoc(doc(db, 'usernames', displayName), {
    //   exists: true,
    // });

    batch.set(userRef, {
      userName: displayName,
      key: key,
      firestoreDate: serverTimestamp(),
      tweetsNum: 0,
      followers: {},
      following: {},
    });
    batch.set(usernameRef, {
      uid: userID,
    });

    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};

export default writeUserToDB;
