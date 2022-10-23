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

const Tweet = () => {
  return (
    <TweetMain>
      <TweetHeader>
        <CloseButton></CloseButton>
        <TweetButton>Tweet</TweetButton>
      </TweetHeader>
      <TweetContent>
        <TweetPPContainer>
          <HomepageTestPP></HomepageTestPP>
        </TweetPPContainer>
        <TweetTextContainer>
          <TweetForm>
            <p>What's happening?</p>
            <textarea placeholder="Type here!"></textarea>
          </TweetForm>
        </TweetTextContainer>
      </TweetContent>
    </TweetMain>
  );
};

export default Tweet;
