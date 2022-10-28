import styled from 'styled-components';
import background from '../../assets/images/Background.png';

export const ProfileMain = styled.div`
  height: 100%;
  width: 100%;
  background-color: #000000;
  display: flex;
  flex-direction: column;

  @media (min-width: 500px) {
    flex-direction: row-reverse;
  }
`;

export const ProfileHeader = styled.div`
  width: 100%;
  height: 50px;
  padding: 0px 15px;
  display: flex;
  align-items: center;
`;

export const ProfileHeaderDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: #eff3f4;
  margin-left: 20px;
  font-weight: 700;
`;

export const ProfileVisuals = styled.div``;

export const ProfileBackground = styled.div`
  background-image: url(${background});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 150px;
  width: 100%;
`;

export const ProfileEditContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 5px;
  padding-top: 10px;
`;

export const ProfileEditButton = styled.button`
  cursor: pointer;
  padding: 5px 15px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 20px;
  background-color: transparent;
  color: #eff3f4;
  transition: ease-in-out 150ms;
  font-weight: 700;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

export const ProfileContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  color: #71767b;
`;

export const ProfileFollowsContainer = styled.div`
  display: flex;
  gap: 15px;
`;

export const ProfileTweetFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  /* position: relative; */
`;

export const ProfileTweetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  border-top: 1px solid #71767b;
  border-bottom: 1px solid #71767b;
  transition: ease-in-out 100ms;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export const ProfileTweetContent = styled.div`
  margin-left: 10px;
  width: 100%;
`;

export const ProfileWhite = styled.p`
  color: #eff3f4;
`;

export const ProfileWhiteBold = styled.p`
  color: #eff3f4;
  font-weight: 700;
`;

export const ProfileGrayText = styled.p`
  color: #71767b;
`;

export const ProfileTweetInteractContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
  margin-top: 10px;

  img {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(31deg)
      brightness(110%) contrast(102%);

    height: 24px;
    width: 24px;

    cursor: pointer;
  }
`;

export const ProfileCommentButton = styled.img``;

export const ProfileRetweetButton = styled.img``;

export const ProfileLikeButton = styled.img`
  // for some reason like svg is bigger than the others
  width: 18px !important;
`;
