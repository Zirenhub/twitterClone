import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../Firebase';

const writeUserToDB = async (userID, displayName) => {
  const key = uuidv4();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };

  try {
    await setDoc(doc(db, 'users', userID), {
      userName: displayName,
      key: key,
      joinDate: `${months[month]} ${year}`,
      tweetsNum: 0,
    });
  } catch (error) {
    console.log(error);
  }
};

export default writeUserToDB;
