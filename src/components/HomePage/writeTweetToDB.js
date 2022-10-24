import { doc, increment, setDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../Firebase';

const writeTweetToDB = async (userID, tweet) => {
  const key = uuidv4();

  try {
    await setDoc(
      doc(db, 'posts', userID),
      {
        [key]: {
          tweet: tweet,
        },
      },
      { merge: true }
    );
    await updateDoc(doc(db, 'users', userID), {
      tweetsNum: increment(1),
    });
  } catch (error) {
    console.log(error);
  }
};

export default writeTweetToDB;
