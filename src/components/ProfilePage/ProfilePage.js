import { useCallback, useEffect, useState } from 'react';
import { UserAuth } from '../../context/authContext';
import { HomepageTestPP } from '../../styles/HomePageStyles/HomePage.styled';
import {
  ProfileHeader,
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
  ProfileWhiteBold,
  ProfileGrayText,
  ProfileWhite,
  ProfilePageResponsiveContainer,
} from '../../styles/ProfilePageStyles/ProfilePage.styled';
import { CloseButton } from '../../styles/WelcomePageStyles/SignUp.styled';
import getUserInfo from './getUserInfo';
import getUserTweets from './getUserTweets';
import { useLocation, useNavigate } from 'react-router-dom';
import TweetInteractions from '../../utils/TweetInteractions';
import WithFooter from '../HOC/WithFooter';
import { LoadingStyled } from '../../styles/WelcomePageStyles/Loading.styled';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [tweetsCount, setTweetsCount] = useState(null);
  const [joinDate, setJoinDate] = useState(null);
  const [tweets, setTweets] = useState(null);
  // const [followers, setFollowers] = useState(null);
  // const [following, setFollowing] = useState(null);

  const { user } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserInfo = useCallback(async () => {
    const res = await getUserInfo(user.uid);
    // tweetsNum and joinDate are returned
    // fetched data from getUserInfo
    // only set state if res is available
    // until user loads it's not.
    if (res) {
      setTweetsCount(res.tweetsNum);
      setJoinDate(res.joinDate.toLocaleDateString());
      // setFollowers(res.followers);
      // setFollowing(res.following)
    }
  }, [user]);

  const fetchUserTweets = useCallback(async () => {
    const res = await getUserTweets(user.uid);
    if (res) {
      const sortedTweets = Object.entries(res.tweets).sort((a, b) => {
        return new Date(b[1].firestoreDate) - new Date(a[1].firestoreDate);
      });

      setTweets(sortedTweets);
    }
    setLoading(false);
  }, [user]);

  const handleCloseProfile = () => {
    navigate('/homepage');
  };

  const handleScrollUp = () => {
    document.getElementById('scroll').scrollTo(0, 0);
  };

  useEffect(() => {
    fetchUserInfo();
    fetchUserTweets();
  }, [fetchUserInfo, fetchUserTweets, location]);

  if (loading) {
    return <LoadingStyled>Loading</LoadingStyled>;
  }

  return (
    <ProfilePageResponsiveContainer id="scroll">
      <ProfileHeader onClick={handleScrollUp}>
        <CloseButton onClick={handleCloseProfile}></CloseButton>
        <ProfileHeaderDetails>
          <p>
            {/* user.display is the name that the user registered with  */}
            {user.displayName}
          </p>
          <p>{tweetsCount} Tweets</p>
        </ProfileHeaderDetails>
      </ProfileHeader>
      <div style={{ marginTop: 50 }}>
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
            tweets.map((tweet) => {
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
                      </div>

                      <ProfileWhite>{tweet[1].tweet}</ProfileWhite>
                      <TweetInteractions></TweetInteractions>
                    </ProfileTweetContent>
                  </div>
                </ProfileTweetContainer>
              );
            })}
        </ProfileTweetFeedContainer>
      </div>
    </ProfilePageResponsiveContainer>
  );
};

export default WithFooter(ProfilePage);
