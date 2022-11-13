import {
  FollowersContainer,
  ProfileHeader,
  ProfileHeaderDetails,
} from '../../styles/ProfilePageStyles/ProfilePage.styled';
import { CloseButton } from '../../styles/WelcomePageStyles/SignUp.styled';
import { TweetModalBackground } from '../../styles/utilsStyles/Tweet.styled';

const FollowersPage = (props) => {
  const { profileInfo } = props;

  return (
    <TweetModalBackground>
      <FollowersContainer>
        <ProfileHeader>
          <CloseButton />
          <ProfileHeaderDetails>
            <p>{profileInfo.userName}</p>
            <p>{profileInfo.tweetsNum} Tweets</p>
          </ProfileHeaderDetails>
        </ProfileHeader>
      </FollowersContainer>
    </TweetModalBackground>
  );
};

export default FollowersPage;
