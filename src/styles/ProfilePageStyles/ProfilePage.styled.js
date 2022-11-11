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
