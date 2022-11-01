import { HomepageTestPP } from '../styles/HomePageStyles/HomePage.styled';
import { CloseButton } from '../styles/WelcomePageStyles/SignUp.styled';
import {
  TweetButton,
  TweetContent,
  TweetForm,
  TweetHeader,
  TweetMain,
  TweetModalBackground,
  TweetPPContainer,
  TweetTextContainer,
} from '../styles/utilsStyles/Tweet.styled';
import { useEffect, useState } from 'react';
import { UserAuth } from '../context/authContext';
import writeTweetToDB from './writeTweetToDB';
import { useNavigate } from 'react-router-dom';
import { LoadingStyled } from '../styles/WelcomePageStyles/Loading.styled';

const Tweet = () => {
  const [text, setText] = useState('');
  const [canTweet, setCanTweet] = useState(false);
  const [tweetTooLong, setTweetTooLong] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = UserAuth();
  const navigate = useNavigate();

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleSubmitTweet = async () => {
    if (canTweet && !tweetTooLong) {
      const userID = user.uid;
      try {
        await writeTweetToDB(userID, text);
      } catch (error) {
        console.log(error);
      }
    }
    handleCloseTweet();
  };

  const handleCloseTweet = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (text.length > 120) {
      setTweetTooLong(true);
      setCanTweet(false);
    } else {
      text ? setCanTweet(true) : setCanTweet(false);

      setTweetTooLong(false);
    }
  }, [text]);

  if (loading) {
    return <LoadingStyled>Loading</LoadingStyled>;
  }

  return (
    <>
      <TweetModalBackground onClick={handleCloseTweet}></TweetModalBackground>
      <TweetMain>
        <TweetHeader>
          <CloseButton onClick={handleCloseTweet}></CloseButton>
          <TweetButton
            bgColor={canTweet ? '#5dbaec' : '#579bbd'}
            color={canTweet ? '#ffffff' : '#9bbecd'}
            disabled={canTweet ? false : true}
            onClick={handleSubmitTweet}
          >
            Tweet
          </TweetButton>
        </TweetHeader>
        <TweetContent>
          <div style={{ display: 'flex' }}>
            <TweetPPContainer>
              <HomepageTestPP></HomepageTestPP>
            </TweetPPContainer>
            <TweetTextContainer>
              <TweetForm>
                <p>What's happening?</p>
                <textarea
                  maxLength="250"
                  placeholder="Type here!"
                  onChange={handleText}
                ></textarea>
              </TweetForm>
            </TweetTextContainer>
          </div>

          {tweetTooLong && (
            <p style={{ color: 'red' }}>Tweet cannot exceed 120 characters</p>
          )}
        </TweetContent>
      </TweetMain>
    </>
  );
};

export default Tweet;
