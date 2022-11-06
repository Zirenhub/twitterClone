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
import { useNavigate, useParams } from 'react-router-dom';
import WithFooter from '../HOC/WithFooter';
import { LoadingStyled } from '../../styles/WelcomePageStyles/Loading.styled';
import DispalyTweetFeed from '../../utils/DispalyTweetFeed';
import getUserID from '../../utils/getUserID';
import sortTweetByDate from '../../utils/sortTweetsByDate';

const ProfilePage = () => {
  // if /sdaiad does not match db return error
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [tweets, setTweets] = useState(null);
  // const [followers, setFollowers] = useState(null);
  // const [following, setFollowing] = useState(null);

  const { user } = UserAuth();
  const navigate = useNavigate();
  const { username } = useParams();

  const fetchUserInfo = useCallback(async () => {
    console.log('profilepage fetching user info');
    try {
      const userID = await getUserID(username);
      const res = await getUserInfo(userID);
      if (res) {
        res.joinDate = res.joinDate.toLocaleDateString();
        res.ID = userID;
        setUserInfo(res);
      }
    } catch (error) {
      console.log(error);
    }
  }, [username]);

  const fetchUserTweets = useCallback(async (userInfo) => {
    console.log('profilepage fetching user tweets');
    try {
      const res = await getUserTweets(userInfo.ID);
      if (res) {
        const sortedTweets = sortTweetByDate(res);
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
  }, []);

  const handleCloseProfile = () => {
    navigate('/homepage');
  };

  const handleScrollUp = () => {
    document.getElementById('scroll').scrollTo(0, 0);
  };

  useEffect(() => {
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
          <p>{userInfo.userName}</p>
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
            {user.uid === username && (
              <ProfileEditContainer>
                <ProfileEditButton>Edit Profile</ProfileEditButton>
              </ProfileEditContainer>
            )}
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
              {userInfo.userName}
            </p>
            <p>Joined {userInfo.joinDate}</p>
            <ProfileFollowsContainer>
              <p>Following</p>
              <p>Follwers</p>
            </ProfileFollowsContainer>
          </ProfileContentInfo>
        </ProfileVisuals>
        <ProfileTweetFeedContainer>
          <DispalyTweetFeed
            initialTweets={tweets}
            setTweets={setTweets}
          ></DispalyTweetFeed>
        </ProfileTweetFeedContainer>
      </div>
    </ProfilePageResponsiveContainer>
  );
};

export default WithFooter(ProfilePage);
