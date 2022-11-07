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
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/authContext';

const DisplaySingleTweet = (props) => {
  const { tweetLink, tweet, handleDeleteTweet, replyingTo } = props;

  const [dropdownActive, setDropDownActive] = useState(false);
  const [idLink, setIdLink] = useState(null);

  const { user } = UserAuth();
  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    setDropDownActive(!dropdownActive);
  };

  const navigateToProfile = () => {
    navigate(`/${replyingTo}`);
  };

  useEffect(() => {
    const link = (username) => {
      setIdLink(username);
    };

    link(tweet.user.userName);
  }, [tweet.user.userName]);

  return (
    <TweetContainer>
      <div style={{ display: 'flex' }}>
        <HomepageTestPP
          style={{
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
          {replyingTo && (
            <p style={{ color: '#71767b' }}>
              replying to{' '}
              <span style={{ color: '#eff3f4' }} onClick={navigateToProfile}>
                {replyingTo}
              </span>
            </p>
          )}
          <Link to={`/${tweet.user.userName}/${tweetLink}`}>
            <TweetWhite>{tweet.tweet}</TweetWhite>
          </Link>
          <TweetInteractions
            likes={tweet.numLikes}
            retweets={tweet.numRetweets}
            comments={tweet.numComments}
          ></TweetInteractions>
        </TweetContent>
      </div>
    </TweetContainer>
  );
};

export default DisplaySingleTweet;
