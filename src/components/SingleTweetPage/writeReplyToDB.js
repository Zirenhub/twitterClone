import { doc, increment, Timestamp, writeBatch } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../Firebase';
import getProfileInfo from '../ProfilePage/getProfileInfo';

const writeReplyToDB = async (reply, replyOwnerID, tweetKey) => {
  const key = uuidv4();
  const replyUserRef = doc(db, 'users', replyOwnerID);
  const postsRef = doc(db, 'posts', key);
  const tweetRef = doc(db, 'posts', tweetKey);

  const { userName, numFollowers, numFollowing } = await getProfileInfo(
    replyOwnerID
  );

  const batch = writeBatch(db);

  const replyData = {
    key: key,
    tweet: reply,
    firestoreDate: Timestamp.fromDate(new Date()),
    numOfLikes: 0,
    numOfComments: 0,
    numOfRetweets: 0,
    replyingTo: tweetKey,
    userID: replyOwnerID,
    user: {
      userName: userName,
      numFollowers: numFollowers,
      numFollowing: numFollowing,
    },
  };

  try {
    batch.set(postsRef, replyData);
    batch.update(replyUserRef, {
      tweetsNum: increment(1),
    });
    batch.update(tweetRef, {
      numOfComments: increment(1),
    });
    await batch.commit();

    replyData.date = replyData.firestoreDate.toDate();
    return replyData;
  } catch (error) {
    console.log(error);
  }
};

export default writeReplyToDB;
