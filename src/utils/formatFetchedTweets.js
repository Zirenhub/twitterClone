const formatFetchedTweets = (tweetsArr) => {
  // tweetsArr = ['key-is-here', {tweet: this-is-tweet, ...etc}]
  const key = tweetsArr[0];
  const dataTweet = tweetsArr[1].tweet;
  const numComments = tweetsArr[1].numberOfComments;
  const numLikes = tweetsArr[1].numberOfLikes;
  const numRetweets = tweetsArr[1].numberOfRetweets;
  const date = tweetsArr[1].firestoreDate.toDate();
  const replyingTo = tweetsArr[1].replyingTo;
  const user = tweetsArr[1].user;

  return {
    key: key,
    tweet: dataTweet,
    numComments: numComments,
    numLikes: numLikes,
    numRetweets: numRetweets,
    date: date,
    replyingTo: replyingTo,
    user: user,
  };
};

export default formatFetchedTweets;
