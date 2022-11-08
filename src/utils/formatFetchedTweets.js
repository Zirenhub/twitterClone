const formatFetchedTweets = (tweetsArr) => {
  // tweetsArr = ['key-is-here', {tweet: this-is-tweet, ...etc}]
  const key = tweetsArr[0];
  const dataTweet = tweetsArr[1].tweet;
  const numComments = tweetsArr[1].numOfComments;
  const numLikes = tweetsArr[1].numOfLikes;
  const numRetweets = tweetsArr[1].numOfRetweets;
  const date = tweetsArr[1].firestoreDate.toDate();
  const user = tweetsArr[1].user;

  return {
    key: key,
    tweet: dataTweet,
    numComments: numComments,
    numLikes: numLikes,
    numRetweets: numRetweets,
    date: date,
    user: user,
  };
};

export default formatFetchedTweets;
