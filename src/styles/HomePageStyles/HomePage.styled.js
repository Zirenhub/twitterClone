import styled from 'styled-components';
import profiepic from '../../assets/images/testpp.png';

export const HomepageHeader = styled.div`
  display: flex;
  position: sticky;
  backdrop-filter: blur(5px);
  top: 0;
  z-index: 20;
  max-height: 50px;
  width: 100%;
  align-items: center;
  color: #e7e9ea;
  padding: 15px;
  justify-content: space-between;
`;

export const HomepageTweetFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 70%;

  @media (min-width: 500px) {
    border-left: 1px solid gray;
  }
`;

export const HeaderProfilePP = styled.div`
  background-image: url(${profiepic});
  border: 1px solid #ffff;
  border-radius: 50%;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;

  height: 32px;
  width: 32px;

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  @media (min-width: 500px) {
    display: none;
  }
`;

export const HomepageTestPP = styled.div`
  background-image: url(${profiepic});
  border: 1px solid #ffff;
  border-radius: 50%;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;

  height: 32px;
  width: 32px;

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
`;

export const HomepageSignout = styled.div`
  height: 32px;
  width: 32px;
  cursor: pointer;

  img {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(31deg)
      brightness(110%) contrast(102%);
    height: 100%;
    width: 100%;
  }
`;
