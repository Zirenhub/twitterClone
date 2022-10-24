import styled from 'styled-components';
import background from '../../assets/images/Background.png';

export const ProfileMain = styled.div`
  height: 100%;
  width: 100%;
  background-color: #000000;
  display: flex;
  flex-direction: column;
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
  background-size: contain;
  height: 150px;
  width: 100%;
`;

export const ProfileEditContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 5px;
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
`;