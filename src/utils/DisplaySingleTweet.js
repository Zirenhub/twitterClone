import {
  TweetGrayText,
  TweetContent,
  TweetOptions,
  TweetWhite,
  TweetOwnerName,
  TweetDropdown,
  StyledLink,
} from '../styles/utilsStyles/DisplayTweetFeed.styled';
import { HomepageTestPP } from '../styles/HomePageStyles/HomePage.styled';
import { useEffect, useState } from 'react';
import { UserAuth } from '../context/authContext';
import {
  DisplayFlex,
  DisplayFlexColumn,
} from '../styles/utilsStyles/Tweet.styled';
import TweetInteractions from '../components/TweetInteractions/TweetInteractions';
import { TweetContainer } from '../styles/utilsStyles/DisplayTweetFeed.styled';
import { PostLine } from '../styles/SingleTweetPageStlyes/SingleTweetPage.styled';

const DisplaySingleTweet = (props) => {
  const { tweetLink, tweet, handleDeleteTweet, replyingTo, topTweet } = props;

  const [dropdownActive, setDropDownActive] = useState(false);
  const [idLink, setIdLink] = useState(null);

  const { user } = UserAuth();

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
    <TweetContainer removePadding={topTweet}>
      <DisplayFlexColumn>
        <HomepageTestPP
          style={{
            backgroundColor: '#ffffff',
            minHeight: 42,
            minWidth: 42,
          }}
        ></HomepageTestPP>
        {topTweet && <PostLine />}
      </DisplayFlexColumn>

      <TweetContent>
        <DisplayFlex>
          {idLink && (
            <StyledLink to={`/${idLink}`}>
              <TweetOwnerName>{tweet.user.userName}</TweetOwnerName>
            </StyledLink>
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
        </DisplayFlex>
        {replyingTo && (
          <p style={{ color: '#71767b' }}>
            replying to <span style={{ color: '#eff3f4' }}>{replyingTo}</span>
          </p>
        )}
        <StyledLink to={`/tweet/${tweetLink}`}>
          <TweetWhite>{tweet.tweet}</TweetWhite>
        </StyledLink>

        {tweet && <TweetInteractions tweet={tweet}></TweetInteractions>}
      </TweetContent>
    </TweetContainer>
  );
};

export default DisplaySingleTweet;
