import { HomepageTestPP } from '../../styles/HomePageStyles/HomePage.styled';
import { CloseButton } from '../../styles/WelcomePageStyles/SignUp.styled';
import {
  TweetButton,
  TweetContent,
  TweetForm,
  TweetHeader,
  TweetMain,
  TweetPPContainer,
  TweetTextContainer,
} from '../../styles/HomePageStyles/Tweet.styled';
import { useEffect, useState } from 'react';
import { UserAuth } from '../../context/authContext';
import writeTweetToDB from './writeTweetToDB';
import { useNavigate } from 'react-router-dom';

const Tweet = () => {
  const [text, setText] = useState('');
  const [canTweet, setCanTweet] = useState(false);

  const { user } = UserAuth();
  const navigate = useNavigate();

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleSubmitTweet = async () => {
    const userID = user.uid;

    await writeTweetToDB(userID, text);
  };

  const handleCloseTweet = () => {
    navigate('/homepage');
  };

  useEffect(() => {
    text ? setCanTweet(true) : setCanTweet(false);
  }, [text]);

  return (
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
      </TweetContent>
    </TweetMain>
  );
};

export default Tweet;
