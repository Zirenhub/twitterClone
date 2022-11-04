import React, { useEffect, useState } from 'react';
import TweetInteractions from '../../utils/TweetInteractions';
import { useNavigate, useParams } from 'react-router-dom';
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
import writeReplyToDB from './writeReplyToDB';

const SingleTweetPage = () => {
  const [tweetData, setTweetData] = useState(null);
  const [reply, setReply] = useState(null);
  const [tweetOwnerID, setTweetOwnerID] = useState(null);

  const { tweet, username } = useParams();
  const { user } = UserAuth();
  const navigate = useNavigate();

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
        setTweetOwnerID(fetchedUserID);
      }
    };

    initialize();
  }, [username, tweet]);
  console.log(tweetData);
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoProfile = () => {
    navigate(`/${username}`);
  };

  const handleReply = (e) => {
    setReply(e.target.value);
  };

  const handleSubmitReply = async () => {
    if (reply) await writeReplyToDB(reply, user.uid, tweetOwnerID);
  };

  return (
    <ProfilePageResponsiveContainer style={{ flexGrow: 0, height: '100%' }}>
      {tweetData && (
        <div>
          <ProfileHeader style={{ fontWeight: 700, position: 'sticky' }}>
            <BackArrow onClick={handleGoBack}></BackArrow>
            <p style={{ marginLeft: 20, fontSize: '1.2rem' }}>Tweet</p>
          </ProfileHeader>
          <SingleTweetPageContainer>
            <SingleTweetPageProfile>
              <HomepageTestPP
                style={{ height: 42, width: 42 }}
                onClick={handleGoProfile}
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
                borderBottom: '1px solid #2f3336',
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
                  onChange={handleReply}
                ></textarea>
              </TweetForm>
              <TweetButton
                // bgColor={canTweet ? '#5dbaec' : '#579bbd'}
                // color={canTweet ? '#ffffff' : '#9bbecd'}
                // disabled={canTweet ? false : true}
                onClick={handleSubmitReply}
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
