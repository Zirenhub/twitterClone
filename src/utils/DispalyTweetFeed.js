import { UserAuth } from '../context/authContext';
import TweetInteractions from './TweetInteractions';
import DisplaySingleTweet from './DisplaySingleTweet';
import deleteTweet from './deleteTweet';
import { TweetContainer } from '../styles/utilsStyles/DisplayTweetFeed.styled';
import {
  DisplayFlex,
  DisplayFlexColumn,
} from '../styles/utilsStyles/Tweet.styled';

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
          <TweetContainer>
            <DisplaySingleTweet
              key={tweet.key}
              tweetLink={tweet.key}
              tweet={tweet}
              handleDeleteTweet={() => handleDeleteTweet(tweet.key)}
            ></DisplaySingleTweet>
            <TweetInteractions
              likes={tweet.numOfLikes}
              retweets={tweet.numOfRetweets}
              comments={tweet.numOfComments}
            ></TweetInteractions>
            {/* fix this */}
          </TweetContainer>
        );
      })}
    </>
  );
};

export default DispalyTweetFeed;
