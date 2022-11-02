import { HomepageTestPP } from '../styles/HomePageStyles/HomePage.styled';
import TweetInteractions from './TweetInteractions';
import {
  TweetGrayText,
  TweetContainer,
  TweetContent,
  TweetOptions,
  TweetWhite,
  TweetWhiteBold,
  TweetDropdown,
} from '../styles/utilsStyles/DisplayTweetFeed.styled';
import { useState } from 'react';

const DisplaySingleTweet = (props) => {
  const { tweet, user, handleDeleteTweet } = props;
  const [dropdownActive, setDropDownActive] = useState(false);

  const handleToggleDropdown = () => {
    setDropDownActive(!dropdownActive);
  };

  return (
    <TweetContainer>
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
              <TweetOptions onClick={handleToggleDropdown}>
                {dropdownActive && (
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
};

export default DisplaySingleTweet;
