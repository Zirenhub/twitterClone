import { UserAuth } from '../context/authContext';
import { useState } from 'react';
import { useEffect } from 'react';
import DisplaySingleTweet from './DisplaySingleTweet';
import deleteTweet from './deleteTweet';

const DispalyTweetFeed = (props) => {
  const { initialTweets } = props;
  const { user } = UserAuth();

  // doing this to prevent fetching data everytime user deletes a tweet,
  // this way we just delete the tweet from the tweet array,
  // updating the tweet feed only with the remaining tweets.
  const [tweets, setTweets] = useState(initialTweets);

  useEffect(() => {
    setTweets(initialTweets);
  }, [initialTweets]);

  const handleDeleteTweet = (key) => {
    const initialize = async () => {
      try {
        await deleteTweet(user.uid, key);
        const updatedTweets = tweets.filter((tweet) => {
          return tweet.key !== key;
        });
        setTweets(updatedTweets);
      } catch (error) {
        console.log(error);
      }
    };
    initialize();
  };

  return (
    <>
      {tweets.map((tweet) => {
        return (
          <DisplaySingleTweet
            key={tweet.key}
            tweet={tweet}
            user={user}
            handleDeleteTweet={() => handleDeleteTweet(tweet.key)}
          ></DisplaySingleTweet>
        );
      })}
    </>
  );
};

export default DispalyTweetFeed;
