const sortTweetByDate = (tweets) => {
  const sortedTweets = [...tweets].sort((a, b) => b.date - a.date);
  return sortedTweets;
};

export default sortTweetByDate;
