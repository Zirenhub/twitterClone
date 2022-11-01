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
  ProfilePageResponsiveContainer,
} from '../../styles/ProfilePageStyles/ProfilePage.styled';
import { CloseButton } from '../../styles/WelcomePageStyles/SignUp.styled';
import getUserInfo from './getUserInfo';
import getUserTweets from './getUserTweets';
import { useNavigate } from 'react-router-dom';
import WithFooter from '../HOC/WithFooter';
import { LoadingStyled } from '../../styles/WelcomePageStyles/Loading.styled';
import DispalyTweetFeed from '../../utils/DispalyTweetFeed';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [tweets, setTweets] = useState(null);
  // const [followers, setFollowers] = useState(null);
  // const [following, setFollowing] = useState(null);

  const { user } = UserAuth();
  const navigate = useNavigate();

  const fetchUserInfo = useCallback(async () => {
    try {
      const res = await getUserInfo(user.uid);
      if (res) {
        res.joinDate = res.joinDate.toLocaleDateString();
        setUserInfo(res);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  const fetchUserTweets = useCallback(
    async (userInfo) => {
      try {
        const res = await getUserTweets(user.uid);
        if (res) {
          const sortedTweets = [...res].sort((a, b) => b.date - a.date);
          const insertUserInfo = sortedTweets.map((tweet) => ({
            ...tweet,
            user: userInfo,
          }));
          setTweets(insertUserInfo);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [user]
  );

  const handleCloseProfile = () => {
    navigate('/homepage');
  };

  const handleScrollUp = () => {
    document.getElementById('scroll').scrollTo(0, 0);
  };

  useEffect(() => {
    console.log('render profilepage');
    fetchUserInfo();
  }, [fetchUserInfo]);

  useEffect(() => {
    if (userInfo !== null) fetchUserTweets(userInfo);
  }, [fetchUserTweets, userInfo]);

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
          <p>{userInfo.tweetsNum} Tweets</p>
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
            <p>Joined {userInfo.joinDate}</p>
            <ProfileFollowsContainer>
              <p>Following</p>
              <p>Follwers</p>
            </ProfileFollowsContainer>
          </ProfileContentInfo>
        </ProfileVisuals>
        <ProfileTweetFeedContainer>
          <DispalyTweetFeed initialTweets={tweets}></DispalyTweetFeed>
        </ProfileTweetFeedContainer>
      </div>
    </ProfilePageResponsiveContainer>
  );
};

export default WithFooter(ProfilePage);
