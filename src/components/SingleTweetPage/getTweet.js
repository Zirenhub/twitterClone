import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const getTweet = async (userID, tweet) => {
  if (userID && tweet) {
    const postRef = doc(db, 'posts', userID);
    const postSnap = await getDoc(postRef);

    let returnData = null;
    if (postSnap.exists()) {
      const rawData = postSnap.data();
      const dataArr = Object.entries(rawData);

      dataArr.forEach((fetchedTweet) => {
        const [tweetKey, tweetData] = fetchedTweet;
        if (tweetKey === tweet) {
          const date = tweetData.firestoreDate.toDate();
          const currentTweet = tweetData.tweet;
          returnData = { key: tweetKey, tweet: currentTweet, date: date };
        }
      });
    } else {
      const repliesRef = doc(db, 'posts', userID, 'replies', tweet);
      const replySnap = await getDoc(repliesRef);
      console.log(replySnap.data());
    }

    return returnData;
  }
};

export default getTweet;
