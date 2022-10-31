import {
  ProfileGrayText,
  ProfileTweetContainer,
  ProfileTweetContent,
  ProfileTweetOptions,
  ProfileWhite,
  ProfileWhiteBold,
} from '../styles/ProfilePageStyles/ProfilePage.styled';
import { HomepageTestPP } from '../styles/HomePageStyles/HomePage.styled';
import TweetInteractions from './TweetInteractions';

const DispalyTweetFeed = (props) => {
  const { tweets } = props;

  return (
    <>
      {tweets.map((tweet) => {
        return (
          <ProfileTweetContainer key={tweet.key}>
            <div style={{ display: 'flex' }}>
              <HomepageTestPP
                style={{
                  border: '1px solid red',
                  backgroundColor: '#ffffff',
                  minHeight: 48,
                  minWidth: 48,
                  flexGrow: 1,
                }}
              ></HomepageTestPP>
              <ProfileTweetContent>
                <div style={{ display: 'flex' }}>
                  <ProfileWhiteBold>{tweet.user.userName}</ProfileWhiteBold>
                  <ProfileGrayText style={{ marginLeft: 10 }}>
                    {tweet.date.toString().slice(0, 21)}
                  </ProfileGrayText>
                  <ProfileTweetOptions></ProfileTweetOptions>
                </div>

                <ProfileWhite>{tweet.tweet}</ProfileWhite>
                <TweetInteractions></TweetInteractions>
              </ProfileTweetContent>
            </div>
          </ProfileTweetContainer>
        );
      })}
    </>
  );
};

export default DispalyTweetFeed;
