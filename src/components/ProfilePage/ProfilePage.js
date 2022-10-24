import { useCallback, useEffect, useState } from 'react';
import { UserAuth } from '../../context/authContext';
import { HomepageTestPP } from '../../styles/HomePageStyles/HomePage.styled';
import {
  ProfileHeader,
  ProfileMain,
  ProfileHeaderDetails,
  ProfileVisuals,
  ProfileBackground,
  ProfileEditButton,
  ProfileEditContainer,
  ProfileContentInfo,
  ProfileFollowsContainer,
  ProfileTweetFeedContainer,
  ProfileTweetContainer,
  ProfileTweetContent,
} from '../../styles/ProfilePageStyles/ProfilePage.styled';
import { LoadingStyled } from '../../styles/WelcomePageStyles/Loading.styled';
import { CloseButton } from '../../styles/WelcomePageStyles/SignUp.styled';
import Footer from '../HomePage/Footer';
import getUserInfo from './getUserInfo';
import getUserTweets from './getUserTweets';

const ProfilePage = () => {
  const [tweetsCount, setTweetsCount] = useState(null);
  const [joinDate, setJoinDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState(null);
  // should be protected route.
  const { user } = UserAuth();

  const fetchUserInfo = useCallback(async () => {
    setLoading(true);
    const res = await getUserInfo(user.uid);
    // tweetsNum and joinDate are returned
    // fetched data from getUserInfo
    // only set state if res is available
    // until user loads it's not.
    if (res) {
      setTweetsCount(res.tweetsNum);
      setJoinDate(res.joinDate);
      setLoading(false);
    }
  }, [user]);

  const fetchUserTweets = useCallback(async () => {
    const res = await getUserTweets(user.uid);
    if (res) {
      setTweets(res.tweets);
    }
  }, [user]);

  useEffect(() => {
    fetchUserInfo();
    fetchUserTweets();
  }, [fetchUserInfo, fetchUserTweets]);

  return (
    <>
      {loading ? (
        <LoadingStyled>Loading</LoadingStyled>
      ) : (
        <ProfileMain>
          <ProfileHeader>
            <CloseButton></CloseButton>
            <ProfileHeaderDetails>
              <p>{user.displayName}</p>
              <p>{tweetsCount} Tweets</p>
            </ProfileHeaderDetails>
          </ProfileHeader>
          <ProfileVisuals>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <ProfileBackground></ProfileBackground>
              <ProfileEditContainer>
                <ProfileEditButton>Edit Profile</ProfileEditButton>
              </ProfileEditContainer>
              <HomepageTestPP
                style={{
                  height: 90,
                  width: 90,
                  position: 'absolute',
                  left: 15,
                  bottom: 0,
                  backgroundColor: '#ffffff',
                }}
              ></HomepageTestPP>
            </div>
            <ProfileContentInfo>
              <p style={{ fontWeight: 'bold', color: '#e7e9ea' }}>
                {user.displayName}
              </p>
              <p>Joined {joinDate}</p>
              <ProfileFollowsContainer>
                <p>Following</p>
                <p>Follwers</p>
              </ProfileFollowsContainer>
            </ProfileContentInfo>
          </ProfileVisuals>
          <ProfileTweetFeedContainer>
            {tweets &&
              Object.keys(tweets).map((key) => (
                <ProfileTweetContainer key={key}>
                  <HomepageTestPP
                    style={{
                      border: '1px solid red',
                      backgroundColor: '#ffffff',
                    }}
                  ></HomepageTestPP>
                  <ProfileTweetContent>
                    <p style={{ color: '#eff3f4', fontWeight: '700' }}>
                      {user.displayName}
                    </p>
                    <p style={{ color: '#eff3f4' }}>{tweets[key].tweet}</p>
                  </ProfileTweetContent>
                </ProfileTweetContainer>
              ))}
          </ProfileTweetFeedContainer>
          <Footer></Footer>
        </ProfileMain>
      )}
    </>
  );
};

export default ProfilePage;
