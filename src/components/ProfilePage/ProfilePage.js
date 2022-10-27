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
  ProfileWhiteBold,
  ProfileGrayText,
  ProfileWhite,
  ProfileTweetInteractContainer,
  ProfileCommentButton,
  ProfileRetweetButton,
  ProfileLikeButton,
} from '../../styles/ProfilePageStyles/ProfilePage.styled';
import { LoadingStyled } from '../../styles/WelcomePageStyles/Loading.styled';
import { CloseButton } from '../../styles/WelcomePageStyles/SignUp.styled';
import Footer from '../HomePage/Footer';
import getUserInfo from './getUserInfo';
import getUserTweets from './getUserTweets';
import commentIcon from '../../assets/images/comment-svgrepo-com.svg';
import retweetIcon from '../../assets/images/retweet-svgrepo-com.svg';
import likeIcon from '../../assets/images/like-svgrepo-com.svg';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [tweetsCount, setTweetsCount] = useState(null);
  const [joinDate, setJoinDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [following, setFollowing] = useState(null);
  // should be protected route.
  const { user } = UserAuth();
  const navigate = useNavigate();

  const fetchUserInfo = useCallback(async () => {
    setLoading(true);

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
            <CloseButton onClick={handleCloseProfile}></CloseButton>
            <ProfileHeaderDetails>
              <p>
                {/* user.display is the name that the user registered with  */}
                {user.displayName}
              </p>
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
                          <ProfileWhiteBold>
                            {user.displayName}
                          </ProfileWhiteBold>
                          <ProfileGrayText style={{ marginLeft: 10 }}>
                            {tweet[1].firestoreDate.slice(0, 21)}
                          </ProfileGrayText>
                        </div>

                        <ProfileWhite>{tweet[1].tweet}</ProfileWhite>
                      </ProfileTweetContent>
                    </div>

                    <ProfileTweetInteractContainer>
                      <ProfileCommentButton
                        src={commentIcon}
                      ></ProfileCommentButton>
                      <ProfileRetweetButton
                        src={retweetIcon}
                      ></ProfileRetweetButton>
                      <ProfileLikeButton src={likeIcon}></ProfileLikeButton>
                    </ProfileTweetInteractContainer>
                  </ProfileTweetContainer>
                );
              })}
          </ProfileTweetFeedContainer>
          <Footer></Footer>
        </ProfileMain>
      )}
    </>
  );
};

export default ProfilePage;
