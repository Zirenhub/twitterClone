import React, { useEffect, useState } from 'react';
import TweetInteractions from '../../utils/TweetInteractions';
import { useParams } from 'react-router-dom';
import { UserAuth } from '../../context/authContext';
import { HomepageTestPP } from '../../styles/HomePageStyles/HomePage.styled';
import {
  ProfileHeader,
  ProfilePageResponsiveContainer,
} from '../../styles/ProfilePageStyles/ProfilePage.styled';
import {
  BackArrow,
  SingleTweetPageContainer,
  SingleTweetPageProfile,
  SingleTweetPageProfileText,
  SingleTweetPageTweet,
  SingleTweetPageInteractionsContainer,
  SingleTweetPageReplyContainer,
} from '../../styles/SingleTweetPageStlyes/SingleTweetPage.styled';
import { TweetForm, TweetButton } from '../../styles/utilsStyles/Tweet.styled';
import { TweetOptions } from '../../styles/utilsStyles/DisplayTweetFeed.styled';
import getUserID from '../../utils/getUserID';
import WithFooter from '../HOC/WithFooter';
import getUserInfo from '../ProfilePage/getUserInfo';
import getTweet from './getTweet';

const SingleTweetPage = () => {
  const [tweetData, setTweetData] = useState(null);

  const { tweet, username } = useParams();
  const { user } = UserAuth();

  const handleDeleteTweet = (key) => {};

  useEffect(() => {
    const initialize = async () => {
      const fetchedUserID = await getUserID(username);
      const fetchedUserInfo = await getUserInfo(fetchedUserID);
      const fetchedTweet = await getTweet(fetchedUserID, tweet);
      if (fetchedTweet) {
        fetchedTweet.date = fetchedTweet.tweet.firestoreDate.toDate();
        fetchedTweet.tweet = fetchedTweet.tweet.tweet;
        delete fetchedTweet.tweet.tweet;
        fetchedTweet.user = fetchedUserInfo;
        setTweetData(fetchedTweet);
      }
    };

    initialize();
  }, [username, tweet]);

  const handleGoBack = () => {};

  const handleGoProile = () => {};

  return (
    <ProfilePageResponsiveContainer>
      {tweetData && (
        <div>
          <ProfileHeader style={{ fontWeight: 700, position: 'sticky' }}>
            <BackArrow onClick={handleGoBack}></BackArrow>
            <p style={{ marginLeft: 20, fontSize: '1.2rem' }}>Tweet</p>
          </ProfileHeader>
          <SingleTweetPageContainer>
            <SingleTweetPageProfile onClick={handleGoProile}>
              <HomepageTestPP
                style={{ height: 42, width: 42 }}
              ></HomepageTestPP>
              <SingleTweetPageProfileText>
                {tweetData.user.userName}
              </SingleTweetPageProfileText>
              {user.displayName === tweetData.user.userName && (
                <TweetOptions style={{ height: 32 }}></TweetOptions>
              )}
            </SingleTweetPageProfile>
            <SingleTweetPageTweet>{tweetData.tweet}</SingleTweetPageTweet>
            <p style={{ color: '#71767b', marginTop: 20, marginBottom: 10 }}>
              {tweetData.date.toString().slice(0, 21)}
            </p>
            <SingleTweetPageInteractionsContainer>
              <p>Retweet</p>
              <p>Quote Tweet</p>
              <p>Likes</p>
            </SingleTweetPageInteractionsContainer>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                borderBottom: '1px solid gray',
                paddingBottom: 10,
              }}
            >
              <TweetInteractions></TweetInteractions>
            </div>
            <SingleTweetPageReplyContainer>
              <HomepageTestPP
                style={{ minHeight: 42, minWidth: 42 }}
              ></HomepageTestPP>
              <TweetForm style={{ padding: 10, width: '100%' }}>
                <textarea
                  style={{ resize: 'none' }}
                  maxLength="150"
                  placeholder="Tweet your reply"
                  // onChange={handleText}
                ></textarea>
              </TweetForm>
              <TweetButton
              // bgColor={canTweet ? '#5dbaec' : '#579bbd'}
              // color={canTweet ? '#ffffff' : '#9bbecd'}
              // disabled={canTweet ? false : true}
              // onClick={handleSubmitTweet}
              >
                Reply
              </TweetButton>
            </SingleTweetPageReplyContainer>
          </SingleTweetPageContainer>
        </div>
      )}
    </ProfilePageResponsiveContainer>
  );
};

export default WithFooter(SingleTweetPage);
