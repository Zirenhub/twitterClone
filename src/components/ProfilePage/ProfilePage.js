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
  ProfileInteractionsContrainer,
  ProfileInteractionButton,
} from '../../styles/ProfilePageStyles/ProfilePage.styled';
import { CloseButton } from '../../styles/WelcomePageStyles/SignUp.styled';
import getUserInfo from './getUserInfo';
import getUserTweets from './getUserTweets';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import WithFooter from '../HOC/WithFooter';
import { LoadingStyled } from '../../styles/WelcomePageStyles/Loading.styled';
import DispalyTweetFeed from '../../utils/DispalyTweetFeed';
import getUserID from '../../utils/getUserID';
import getUserReplies from './getUserReplies';
import getUserLikes from './getUserLikes';
import sortTweetsByDate from '../../utils/sortTweetsByDate';

const ProfilePage = () => {
  // if /sdaiad does not match db return error
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [tweets, setTweets] = useState(null);
  const [userID, setUserID] = useState(null);
  // const [followers, setFollowers] = useState(null);
  // const [following, setFollowing] = useState(null);

  const { user } = UserAuth();
  const navigate = useNavigate();
  const { username } = useParams();
  const location = useLocation();

  const fetchUserInfo = useCallback(async () => {
    console.log('profilepage fetching user info');
    try {
      const userID = await getUserID(username);
      setUserID(userID);
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

  const fetchUserTweets = useCallback(async () => {
    console.log('profilepage fetching user tweets');
    try {
      const res = await getUserTweets(userID);
      if (res) {
        setTweets(sortTweetsByDate(res));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userID]);

  const handleSwitchToReplies = async () => {
    const userReplies = await getUserReplies(userID);
    if (userReplies) {
      setTweets(userReplies);
    }
  };

  const handleSwitchToLikes = async () => {
    const userLikes = await getUserLikes(userID);
    if (userLikes) {
      setTweets(userLikes);
    }
  };

  const handleCloseProfile = () => {
    navigate('/homepage');
  };

  const handleScrollUp = () => {
    document.getElementById('scroll').scrollTo(0, 0);
  };

  useEffect(() => {
    const sentTweet = JSON.parse(sessionStorage.getItem('tweetSent'));
    if (sentTweet) {
      sentTweet.date = new Date(sentTweet.date);
      setTweets((currentTweets) => [sentTweet, ...currentTweets]);
      sessionStorage.removeItem('tweetSent');
    }
  }, [location]);

  useEffect(() => {
    const initialize = async () => {
      await fetchUserInfo();
      await fetchUserTweets();
    };

    initialize();
  }, [fetchUserInfo, fetchUserTweets]);

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
      <div
        style={{
          marginTop: 50,
          maxWidth: 600,
        }}
      >
        <ProfileVisuals>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <ProfileBackground></ProfileBackground>
            {user.displayName === userInfo.userName ? (
              <ProfileEditContainer>
                <ProfileEditButton>Edit Profile</ProfileEditButton>
              </ProfileEditContainer>
            ) : (
              <ProfileEditContainer>
                <ProfileEditButton>Follow</ProfileEditButton>
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
          <ProfileInteractionsContrainer>
            <ProfileInteractionButton onClick={fetchUserTweets}>
              <p>Tweets</p>
            </ProfileInteractionButton>
            <ProfileInteractionButton onClick={handleSwitchToReplies}>
              <p>Replies</p>
            </ProfileInteractionButton>
            <ProfileInteractionButton>
              <p>Media</p>
            </ProfileInteractionButton>
            <ProfileInteractionButton onClick={handleSwitchToLikes}>
              <p>Likes</p>
            </ProfileInteractionButton>
          </ProfileInteractionsContrainer>
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
