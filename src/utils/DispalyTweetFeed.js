import {
  TweetGrayText,
  TweetContainer,
  TweetContent,
  TweetOptions,
  TweetWhite,
  TweetWhiteBold,
  TweetDropdown,
} from '../styles/utilsStyles/DisplayTweetFeed.styled';
import { HomepageTestPP } from '../styles/HomePageStyles/HomePage.styled';
import TweetInteractions from './TweetInteractions';
import { UserAuth } from '../context/authContext';
import { useState } from 'react';
import deleteTweet from './deleteTweet';

const DispalyTweetFeed = (props) => {
  const { initialTweets } = props;
  const { user } = UserAuth();
  const [dropdown, setDropdown] = useState('');

  // doing this to prevent fetching data everytime user deletes a tweet,
  // this way we just delete the tweet from the tweet array,
  // updating the tweet feed only with the remaining tweets.
  const [tweets, setTweets] = useState(initialTweets);

  const handleToggleDropdown = (key) => {
    dropdown === key ? setDropdown('') : setDropdown(key);
  };

  const handleDeleteTweet = () => {
    const initialize = async () => {
      try {
        await deleteTweet(user.uid, dropdown);
        const updatedTweets = tweets.filter((tweet) => {
          return tweet.key !== dropdown;
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
          <TweetContainer key={tweet.key}>
            <div style={{ display: 'flex' }}>
              <HomepageTestPP
                style={{
                  border: '1px solid red',
                  backgroundColor: '#ffffff',
                  minHeight: 48,
                  minWidth: 48,
                  flexGrow: 1,
                }}
              ></HomepageTestPP>
              <TweetContent>
                <div style={{ display: 'flex' }}>
                  <TweetWhiteBold>{tweet.user.userName}</TweetWhiteBold>
                  <TweetGrayText style={{ marginLeft: 10 }}>
                    {tweet.date.toString().slice(0, 21)}
                  </TweetGrayText>
                  {user.displayName === tweet.user.userName && (
                    <TweetOptions
                      onClick={() => handleToggleDropdown(tweet.key)}
                    >
                      {dropdown === tweet.key && (
                        <TweetDropdown>
                          <ul>
                            <li onClick={handleDeleteTweet}>Delete</li>
                          </ul>
                        </TweetDropdown>
                      )}
                    </TweetOptions>
                  )}
                </div>
                <TweetWhite>{tweet.tweet}</TweetWhite>
                <TweetInteractions></TweetInteractions>
              </TweetContent>
            </div>
          </TweetContainer>
        );
      })}
    </>
  );
};

export default DispalyTweetFeed;
