import { doc, increment, Timestamp, writeBatch } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import getProfileInfo from '../components/ProfilePage/getProfileInfo';
import { db } from '../Firebase';

const writeTweetToDB = async (userID, tweet) => {
  const key = uuidv4();
  const postsRef = doc(db, 'posts', key);
  const userInfoRef = doc(db, 'users', userID);

  const { userName, numFollowers, numFollowing } = await getProfileInfo(userID);

  const tweetData = {
    key: key,
    tweet: tweet,
    firestoreDate: Timestamp.fromDate(new Date()),
    numOfLikes: 0,
    numOfComments: 0,
    numOfRetweets: 0,
    replyingTo: null,
    userID: userID,
    user: {
      userName: userName,
      numFollowers: numFollowers,
      numFollowing: numFollowing,
    },
  };

  const batch = writeBatch(db);

  try {
    batch.set(postsRef, tweetData);
    batch.update(userInfoRef, {
      tweetsNum: increment(1),
    });
    await batch.commit();

    tweetData.date = tweetData.firestoreDate.toDate();
    return tweetData;
  } catch (error) {
    console.log(error);
  }
};

export default writeTweetToDB;
