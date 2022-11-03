import { HomepageTestPP } from '../styles/HomePageStyles/HomePage.styled';
import TweetInteractions from './TweetInteractions';
import {
  TweetGrayText,
  TweetContainer,
  TweetContent,
  TweetOptions,
  TweetWhite,
  TweetOwnerName,
  TweetDropdown,
} from '../styles/utilsStyles/DisplayTweetFeed.styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getUserID from './getUserID';

const DisplaySingleTweet = (props) => {
  const { tweet, user, handleDeleteTweet, handleOpenTweet } = props;

  const [dropdownActive, setDropDownActive] = useState(false);
  const [idLink, setIdLink] = useState(null);

  const handleToggleDropdown = () => {
    setDropDownActive(!dropdownActive);
  };

  useEffect(() => {
    const link = (username) => {
      setIdLink(username);
    };

    link(tweet.user.userName);
  }, [tweet.user.userName]);

  return (
    <TweetContainer onClick={handleOpenTweet}>
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
            {idLink && (
              <Link to={`/${idLink}`}>
                <TweetOwnerName>{tweet.user.userName}</TweetOwnerName>
              </Link>
            )}
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
