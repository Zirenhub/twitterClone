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
} from '../../styles/ProfilePageStyles/ProfilePage.styled';
import { LoadingStyled } from '../../styles/WelcomePageStyles/Loading.styled';
import { CloseButton } from '../../styles/WelcomePageStyles/SignUp.styled';
import getUserInfo from './getUserInfo';

const ProfilePage = () => {
  const [tweetsCount, setTweetsCount] = useState(null);
  const [joinDate, setJoinDate] = useState(null);
  const [loading, setLoading] = useState(false);
  // should be protected route.
  const { user } = UserAuth();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await getUserInfo(user.uid);
    // tweetsNum and joinDate are returned
    // fetched data from getUserInfo
    setTweetsCount(res.tweetsNum);
    setJoinDate(res.joinDate);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
              <p>{user.displayName}</p>
              <p>Joined {joinDate}</p>
            </ProfileContentInfo>
          </ProfileVisuals>
        </ProfileMain>
      )}
    </>
  );
};

export default ProfilePage;
