import { useCallback, useEffect, useRef, useState } from 'react';
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
  ProfileWhiteSpan,
} from '../../styles/ProfilePageStyles/ProfilePage.styled';
import { CloseButton } from '../../styles/WelcomePageStyles/SignUp.styled';
import getProfileInfo from './getProfileInfo';
import getProfileTweets from './getProfileTweets';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import WithFooter from '../HOC/WithFooter';
import { LoadingStyled } from '../../styles/WelcomePageStyles/Loading.styled';
import DispalyTweetFeed from '../../utils/DispalyTweetFeed';
import getProfileID from '../../utils/getUserID';
import getProfileReplies from './getProfileReplies';
import getProfileLikes from './getProfileLikes';
import sortTweetsByDate from '../../utils/sortTweetsByDate';
import followProfile from './followProfile';
import isProfileFollowed from './isProfileFollowed';
import unfollowProfile from './unfollowProfile';
import FollowersPage from './FollowersPage';

const ProfilePage = () => {
  // if /sdaiad does not match db return error
  const [loading, setLoading] = useState(true);
  const [profileInfo, setProfileInfo] = useState(null);
  const [tweets, setTweets] = useState(null);
  const [activeFollowPage, setActiveFollowPage] = useState(null);

  const { user } = UserAuth();
  const navigate = useNavigate();
  const { username } = useParams();
  const location = useLocation();
  const followRef = useRef();

  const fetchUserInfo = useCallback(async () => {
    console.log('profilepage fetching user info');
    try {
      const userID = await getProfileID(username);
      const res = await getProfileInfo(userID);
      if (res) {
        res.joinDate = res.joinDate.toLocaleDateString();
        res.ID = userID;
        setProfileInfo(res);
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  }, [username]);

  const fetchUserTweets = useCallback(async (profileInfo) => {
    console.log('profilepage fetching user tweets');
    try {
      const res = await getProfileTweets(profileInfo.ID);
      if (res) {
        setTweets(sortTweetsByDate(res));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSwitchToTweets = async () => {
    fetchUserTweets(profileInfo);
  };

  const handleSwitchToReplies = async () => {
    const userReplies = await getProfileReplies(profileInfo.ID);
    if (userReplies) {
      setTweets(userReplies);
    }
  };

  const handleSwitchToLikes = async () => {
    const userLikes = await getProfileLikes(profileInfo.ID);
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

  const handleFollow = () => {
    followRef.current.disabled = true;
    const updateFollowStatus = async () => {
      const isAlreadyFollowed = profileInfo.isFollowed;
      if (isAlreadyFollowed) {
        const promiseUnfollow = await unfollowProfile(profileInfo.ID, user.uid);
        if (promiseUnfollow) {
          setProfileInfo((prevState) => ({
            ...prevState,
            numFollowers: prevState.numFollowers - 1,
            isFollowed: false,
          }));
        }
      } else {
        const promiseFollow = await followProfile(profileInfo, user.uid);
        if (promiseFollow) {
          setProfileInfo((prevState) => ({
            ...prevState,
            numFollowers: prevState.numFollowers + 1,
            isFollowed: true,
          }));
        }
      }
    };
    updateFollowStatus();
    followRef.current.disabled = false;
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
      const promiseProfileInfo = await fetchUserInfo();
      await fetchUserTweets(promiseProfileInfo);

      if (promiseProfileInfo.ID !== user.uid) {
        const promiseIsFollowed = await isProfileFollowed(
          promiseProfileInfo.ID,
          user.uid
        );
        setProfileInfo((prevState) => ({
          ...prevState,
          isFollowed: promiseIsFollowed,
        }));
      }
      setLoading(false);
    };

    initialize();
  }, [fetchUserInfo, fetchUserTweets, user]);

  if (loading) {
    return <LoadingStyled>Loading</LoadingStyled>;
  }

  return (
    <>
      <ProfilePageResponsiveContainer id="scroll">
        <ProfileHeader onClick={handleScrollUp}>
          <CloseButton onClick={handleCloseProfile}></CloseButton>
          <ProfileHeaderDetails>
            <p>{profileInfo.userName}</p>
            <p>{profileInfo.tweetsNum} Tweets</p>
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
              {user.displayName === profileInfo.userName ? (
                <ProfileEditContainer>
                  <ProfileEditButton>Edit Profile</ProfileEditButton>
                </ProfileEditContainer>
              ) : (
                <ProfileEditContainer>
                  <ProfileEditButton ref={followRef} onClick={handleFollow}>
                    {profileInfo.isFollowed ? 'UnFollow' : 'Follow'}
                  </ProfileEditButton>
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
                {profileInfo.userName}
              </p>
              <p>Joined {profileInfo.joinDate}</p>
              <ProfileFollowsContainer>
                <p onClick={() => setActiveFollowPage('following')}>
                  <ProfileWhiteSpan>
                    {profileInfo.numFollowing}
                  </ProfileWhiteSpan>{' '}
                  Following
                </p>
                <p onClick={() => setActiveFollowPage('followers')}>
                  <ProfileWhiteSpan>
                    {profileInfo.numFollowers}
                  </ProfileWhiteSpan>{' '}
                  Followers
                </p>
              </ProfileFollowsContainer>
            </ProfileContentInfo>
            <ProfileInteractionsContrainer>
              <ProfileInteractionButton onClick={handleSwitchToTweets}>
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
      {activeFollowPage && (
        <FollowersPage
          profileInfo={profileInfo}
          activePage={activeFollowPage}
          setActivePage={setActiveFollowPage}
        />
      )}
    </>
  );
};

export default WithFooter(ProfilePage);
