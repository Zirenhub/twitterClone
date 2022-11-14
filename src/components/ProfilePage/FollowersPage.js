import { useEffect } from 'react';
import { useState } from 'react';
import { UserAuth } from '../../context/authContext';
import { HomepageTestPP } from '../../styles/HomePageStyles/HomePage.styled';
import {
  FollowersContainer,
  ProfileModalBackground,
  ProfileHeaderDetails,
  FollowingButton,
  FollowersButton,
  ProfileFollowersPageHeader,
  FollowersPageButtonContainer,
  FollowersProfileContainer,
  ProfileEditButton,
} from '../../styles/ProfilePageStyles/ProfilePage.styled';
import { DisplayFlex } from '../../styles/utilsStyles/Tweet.styled';
import { CloseButton } from '../../styles/WelcomePageStyles/SignUp.styled';
import getProfileFollowers from './getProfileFollowers';
import getProfileFollowing from './getProfileFollowing';

const FollowersPage = (props) => {
  const { profileInfo, activePage, setActivePage } = props;

  const [currentPage, setCurrentPage] = useState(null);
  const [profiles, setProfiles] = useState(null);

  const { user } = UserAuth();

  const handleClosePage = () => {
    setActivePage(null);
  };

  const handleFollow = (follower) => {
    console.log(follower.id);
  };

  useEffect(() => {
    const getFollowers = async () => {
      const promiseFollowers = await getProfileFollowers(profileInfo.ID);
      if (promiseFollowers) {
        setProfiles(promiseFollowers);
      }
    };

    const getFollowing = async () => {
      const promiseFollowing = await getProfileFollowing(profileInfo.ID);
      if (promiseFollowing) {
        setProfiles(promiseFollowing);
      }
    };

    if (currentPage === 'followers') {
      getFollowers();
    } else if (currentPage === 'following') {
      getFollowing();
    }
  }, [currentPage, profileInfo]);

  useEffect(() => {
    setCurrentPage(activePage);
  }, [activePage]);

  return (
    <ProfileModalBackground>
      <FollowersContainer>
        <ProfileFollowersPageHeader>
          <DisplayFlex style={{ alignItems: 'center' }}>
            <CloseButton onClick={handleClosePage} />
            <ProfileHeaderDetails>
              <p>{profileInfo.userName}</p>
            </ProfileHeaderDetails>
          </DisplayFlex>

          <FollowersPageButtonContainer>
            <FollowersButton
              onClick={() => setCurrentPage('followers')}
              active={currentPage === 'followers' && true}
            >
              Followers
            </FollowersButton>
            <FollowingButton
              onClick={() => setCurrentPage('following')}
              active={currentPage === 'following' && true}
            >
              Following
            </FollowingButton>
          </FollowersPageButtonContainer>
        </ProfileFollowersPageHeader>
        {profiles &&
          profiles.map((profile) => {
            return (
              <FollowersProfileContainer key={profile.id}>
                <HomepageTestPP></HomepageTestPP>
                {profile.userName}
                {profile.id !== user.uid && (
                  <ProfileEditButton
                    style={{ marginLeft: 'auto' }}
                    onClick={() => handleFollow(profile)}
                  >
                    work in progress
                  </ProfileEditButton>
                )}
              </FollowersProfileContainer>
            );
          })}
      </FollowersContainer>
    </ProfileModalBackground>
  );
};

export default FollowersPage;
