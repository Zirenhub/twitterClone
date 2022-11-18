import {
  TweetForm,
  TweetButton,
  DisplayFlexColumn,
} from '../../styles/utilsStyles/Tweet.styled';
import { HomepageTestPP } from '../../styles/HomePageStyles/HomePage.styled';
import { TweetOptions } from '../../styles/utilsStyles/DisplayTweetFeed.styled';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserAuth } from '../../context/authContext';
import TweetInteractions from '../TweetInteractions/TweetInteractions';
import writeReplyToDB from './writeReplyToDB';
import sortTweetByDate from '../../utils/sortTweetsByDate';
import {
  SingleTweetPageContainer,
  SingleTweetPageProfile,
  SingleTweetPageProfileText,
  SingleTweetPageTweet,
  SingleTweetPageInteractionsContainer,
  SingleTweetPageReplyContainer,
  PostContainer,
  PostLine,
} from '../../styles/SingleTweetPageStlyes/SingleTweetPage.styled';

const SelectedPost = (props) => {
  const { tweetData, tweetReplies, setTweetReplies, replyingTo } = props;
  const [reply, setReply] = useState('');

  const { user } = UserAuth();
  const navigate = useNavigate();

  const handleGoProfile = () => {
    navigate(`/${tweetData.user.userName}`);
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
    <PostContainer>
      <SingleTweetPageContainer>
        <SingleTweetPageProfile>
          <DisplayFlexColumn>
            {replyingTo && <PostLine style={{ height: 10 }} />}
            <HomepageTestPP
              style={{ height: 42, width: 42 }}
              onClick={handleGoProfile}
            ></HomepageTestPP>
          </DisplayFlexColumn>

          <SingleTweetPageProfileText>
            {tweetData.user.userName}
          </SingleTweetPageProfileText>
          {user.displayName === tweetData.user.userName && (
            <TweetOptions style={{ height: 32 }}></TweetOptions>
          )}
        </SingleTweetPageProfile>

        {replyingTo && (
          <p style={{ color: '#71767b' }}>
            replying to{' '}
            <span style={{ color: '#eff3f4' }}>
              {/* replyingTo.user will be undefined if tweet is deleted */}
              {replyingTo?.user?.userName || replyingTo}
            </span>
          </p>
        )}
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
          <TweetInteractions tweet={tweetData}></TweetInteractions>
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
            bgColor={reply ? '#5dbaec' : '#579bbd'}
            color={reply ? '#ffffff' : '#9bbecd'}
            disabled={reply ? false : true}
            onClick={handleSubmitReply}
          >
            Reply
          </TweetButton>
        </SingleTweetPageReplyContainer>
      </SingleTweetPageContainer>
    </PostContainer>
  );
};

export default SelectedPost;
