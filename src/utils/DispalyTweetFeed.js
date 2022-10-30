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
  const { tweets, user } = props;

  return (
    <>
      {tweets.map((tweet) => {
        return (
          <ProfileTweetContainer key={tweet[0]}>
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
                  <ProfileWhiteBold>{user.displayName}</ProfileWhiteBold>
                  <ProfileGrayText style={{ marginLeft: 10 }}>
                    {tweet[1].firestoreDate.slice(0, 21)}
                  </ProfileGrayText>
                  <ProfileTweetOptions></ProfileTweetOptions>
                </div>

                <ProfileWhite>{tweet[1].tweet}</ProfileWhite>
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
