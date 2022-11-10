import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingStyled } from '../../styles/WelcomePageStyles/Loading.styled';
import { BackArrow } from '../../styles/SingleTweetPageStlyes/SingleTweetPage.styled';
import { UserAuth } from '../../context/authContext';
import DisplaySingleTweet from '../../utils/DisplaySingleTweet';
import sortTweetByDate from '../../utils/sortTweetsByDate';
import SelectedPost from './SelectedPost';
import deleteReply from './deleteReply';
import WithFooter from '../HOC/WithFooter';
import getReplies from './getReplies';
import getTweet from './getTweet';
import {
  ProfileHeader,
  ProfilePageResponsiveContainer,
} from '../../styles/ProfilePageStyles/ProfilePage.styled';

const SingleTweetPage = () => {
  const [tweetData, setTweetData] = useState(null);
  const [tweetReplies, setTweetReplies] = useState(null);
  const [loading, setLoading] = useState(true);

  const { tweet, username } = useParams();
  const { user } = UserAuth();
  const navigate = useNavigate();

  const handleDeleteReply = async (replyKey, tweetKey) => {
    const promiseDelete = await deleteReply(user.uid, replyKey, tweetKey);
    if (promiseDelete) {
      setTweetReplies((current) =>
        current.filter((reply) => reply.key !== replyKey)
      );
    }
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

  if (loading) {
    return <LoadingStyled>Loading</LoadingStyled>;
  }

  return (
    <ProfilePageResponsiveContainer style={{ flexGrow: 1, overflowY: 'auto' }}>
      <ProfileHeader style={{ fontWeight: 700, position: 'sticky' }}>
        <BackArrow onClick={handleGoBack}></BackArrow>
        <p style={{ marginLeft: 20, fontSize: '1.2rem' }}>Tweet</p>
      </ProfileHeader>

      <SelectedPost
        username={username}
        tweetData={tweetData}
        tweetReplies={tweetReplies}
        setTweetReplies={setTweetReplies}
      />

      {tweetReplies &&
        tweetReplies.map((reply) => {
          return (
            <DisplaySingleTweet
              key={reply.key}
              tweetLink={reply.key}
              tweet={reply}
              handleDeleteReply={() =>
                handleDeleteReply(reply.key, tweetData.key)
              }
              replyingTo={tweetData.user.userName}
            ></DisplaySingleTweet>
          );
        })}
    </ProfilePageResponsiveContainer>
  );
};

export default WithFooter(SingleTweetPage);
