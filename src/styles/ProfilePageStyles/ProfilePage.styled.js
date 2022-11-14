import styled from 'styled-components';
import background from '../../assets/images/Background.png';

export const ProfileMain = styled.div`
  height: 100%;
  width: 100%;
  background-color: #000000;
  overflow: auto;
  display: flex;
  flex-direction: column;
  /* overflow-y: auto; */

  @media (min-width: 500px) {
    flex-direction: row-reverse;
  }
`;

export const ProfilePageResponsiveContainer = styled.div`
  flex-grow: 1;

  @media (min-width: 500px) {
    border-left: 1px solid #2f3336;
  }
`;

export const ProfileHeader = styled.div`
  width: 100%;
  height: 50px;
  padding: 0px 15px;
  display: flex;
  align-items: center;
  position: fixed;
  backdrop-filter: blur(5px);
  z-index: 20;
  color: #eff3f4;
  max-width: 600px;
  border-right: 1px solid #2f3336;
  top: 0;
  cursor: pointer;
`;

export const ProfileHeaderDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  font-weight: 700;
`;

export const ProfileVisuals = styled.div`
  border-right: 1px solid #2f3336;
`;

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

  & > p {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ProfileTweetFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-grow: 1;
`;

export const ProfileInteractionsContrainer = styled.div`
  display: flex;
  border-bottom: 1px solid #2f3336;
`;

export const ProfileInteractionButton = styled.div`
  cursor: pointer;
  color: #71767b;
  font-weight: 700;
  text-align: center;
  flex-grow: 1;
  padding: 10px 0px;
  transition: ease-in-out 100ms;

  &:hover {
    background-color: rgba(231, 233, 234, 0.1);
  }
`;

export const ProfileWhiteSpan = styled.span`
  color: #eff3f4;
  font-weight: 700;
`;

export const ProfileModalBackground = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 200;

  @media (min-width: 600px) {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const ProfileFollowersPageHeader = styled.div`
  width: 100%;
  padding: 13px 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: sticky;
  backdrop-filter: blur(5px);
  z-index: 20;
  color: #eff3f4;
  max-width: 600px;
  border-right: 1px solid #2f3336;
  cursor: pointer;
  border-bottom: 1px solid #2f3336;
`;

export const FollowersContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 99.9%;
  width: 100%;
  background-color: #000000;

  @media (min-width: 600px) {
    height: 500px;
    width: 600px;
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
    border-radius: 15px;
    overflow-y: auto;
    max-width: 600px;
  }
`;

export const FollowersPageButtonContainer = styled.div`
  display: flex;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;
`;

export const FollowersButton = styled.div`
  flex-grow: 1;

  ${(props) => {
    if (props.active) {
      return `
        text-decoration: underline;
        text-decoration-color: #1d9bf0;
        text-decoration-thickness: 3px;
        text-underline-offset: 5px;
      `;
    }
  }}
`;
export const FollowingButton = styled.div`
  flex-grow: 1;

  ${(props) => {
    if (props.active) {
      return `
        text-decoration: underline;
        text-decoration-color: #1d9bf0;
        text-decoration-thickness: 3px;
        text-underline-offset: 5px;
      `;
    }
  }}
`;

export const FollowersProfileContainer = styled.div`
  color: #eff3f4;
  display: flex;
  font-weight: 700;
  padding: 10px 15px;
  gap: 20px;
  align-items: center;
  border-bottom: 1px solid #2f3336;

  &:hover {
    background-color: #2f3336;
    cursor: pointer;
  }
`;
