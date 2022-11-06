const formatFetchedTweets = (tweetsArr) => {
  // tweetsArr = ['key-is-here', {tweet: this-is-tweet, ...etc}]
  const key = tweetsArr[0];
  const dataTweet = tweetsArr[1].tweet;
  const numComments = tweetsArr[1].numberOfComments;
  const numLikes = tweetsArr[1].numberOfLikes;
  const numRetweets = tweetsArr[1].numberOfRetweets;
  const date = tweetsArr[1].firestoreDate.toDate();

  return {
    key: key,
    tweet: dataTweet,
    numComments: numComments,
    numLikes: numLikes,
    numRetweets: numRetweets,
    date: date,
  };
};

export default formatFetchedTweets;
