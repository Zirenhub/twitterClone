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

const DispalyTweetFeed = (props) => {
  const [dropdown, setDropdown] = useState('');

  const { tweets } = props;
  const { user } = UserAuth();

  const handleToggleDropdown = (key) => {
    dropdown === key ? setDropdown('') : setDropdown(key);
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
                            <li>Delete</li>
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
