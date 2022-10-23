import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../Firebase';

const writeUserToFirestore = async (userID, displayName) => {
  const key = uuidv4();

  try {
    await setDoc(doc(db, 'users', userID), {
      userName: displayName,
      key: key,
    });
  } catch (error) {
    console.log(error);
  }
};

export default writeUserToFirestore;
