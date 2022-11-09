import React, { useCallback, useEffect, useState } from 'react';
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
  PostContainer,
} from '../../styles/SingleTweetPageStlyes/SingleTweetPage.styled';
import { TweetForm, TweetButton } from '../../styles/utilsStyles/Tweet.styled';
import { TweetOptions } from '../../styles/utilsStyles/DisplayTweetFeed.styled';
import getUserID from '../../utils/getUserID';
import WithFooter from '../HOC/WithFooter';
import getUserInfo from '../ProfilePage/getUserInfo';
import getTweet from './getTweet';
import writeReplyToDB from './writeReplyToDB';
import getReplies from './getReplies';
import DisplaySingleTweet from '../../utils/DisplaySingleTweet';
import deleteReply from './deleteReply';
import sortTweetByDate from '../../utils/sortTweetsByDate';
import { LoadingStyled } from '../../styles/WelcomePageStyles/Loading.styled';

const SingleTweetPage = () => {
  const [tweetData, setTweetData] = useState(null);
  const [tweetReplies, setTweetReplies] = useState(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);

  const { tweet, username } = useParams();
  const { user } = UserAuth();
  const navigate = useNavigate();

  const handleDeleteTweet = async (replyKey, tweetKey) => {
    await deleteReply(user.uid, replyKey, tweetKey);
    setTweetReplies((current) =>
      current.filter((reply) => reply.key !== replyKey)
    );
  };

  const fetchTweet = useCallback(async () => {
    // could have just used firestore uid,
    // but twitter.com/username_here is more elegant than
    // twitter.com/sdi0hsadad_8732diuahadh9q2d

    const fetchedTweet = await getTweet(tweet);
    if (fetchedTweet) {
      setTweetData(fetchedTweet);
    }
  }, [tweet]);

  const fetchReplies = useCallback(async () => {
    const fetchedReplies = await getReplies(tweet);

    if (fetchedReplies) {
      const sortedTweets = sortTweetByDate(fetchedReplies);
      setTweetReplies(sortedTweets); // do orderBy instead ?
      setLoading(false);
    }
  }, [tweet]);

  useEffect(() => {
    console.log('fetching single tweet page');
    const initialize = async () => {
      await fetchTweet();
      await fetchReplies();
    };

    initialize();
  }, [fetchTweet, fetchReplies]);

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
    if (reply) {
      const promiseReply = await writeReplyToDB(reply, user.uid, tweetData.key);
      if (promiseReply) {
        const replies = [...tweetReplies, promiseReply];
        const sortedTweets = sortTweetByDate(replies);
        setTweetReplies(sortedTweets);
      }
      setReply('');
    }
  };

  return (
    <ProfilePageResponsiveContainer style={{ flexGrow: 1, overflowY: 'auto' }}>
      {loading && <LoadingStyled>Loading</LoadingStyled>}
      {tweetData && (
        <PostContainer>
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
                  value={reply}
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
        </PostContainer>
      )}
      {tweetReplies &&
        tweetReplies.map((reply) => {
          return (
            <DisplaySingleTweet
              key={reply.key}
              tweetLink={reply.key}
              tweet={reply}
              handleDeleteTweet={() =>
                handleDeleteTweet(reply.key, tweetData.key)
              }
              replyingTo={tweetData.user.userName}
            ></DisplaySingleTweet>
          );
        })}
    </ProfilePageResponsiveContainer>
  );
};

export default WithFooter(SingleTweetPage);
