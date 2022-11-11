import { UserAuth } from '../context/authContext';
import DisplaySingleTweet from './DisplaySingleTweet';
import deleteTweet from '../components/TweetInteractions/deleteTweet';

const DispalyTweetFeed = (props) => {
  const { initialTweets, setTweets } = props;
  const { user } = UserAuth();

  const handleDeleteTweet = async (key) => {
    try {
      await deleteTweet(user.uid, key);
      const updatedTweets = initialTweets.filter((tweet) => {
        return tweet.key !== key;
      });
      setTweets(updatedTweets);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {initialTweets.map((tweet) => {
        return (
          <DisplaySingleTweet
            key={tweet.key}
            tweetLink={tweet.key}
            tweet={tweet}
            handleDeleteTweet={() => handleDeleteTweet(tweet.key)}
          ></DisplaySingleTweet>
        );
      })}
    </>
  );
};

export default DispalyTweetFeed;
