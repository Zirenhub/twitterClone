import styled from 'styled-components';
import profiepic from '../../assets/images/testpp.png';

export const HomepageHeader = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  z-index: 99999;
  max-height: 50px;
  width: 100%;
  background-color: #000000 !important;
  align-items: center;
  color: #e7e9ea;
  padding: 15px;
  justify-content: space-between;
`;

export const HomepageTweetFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex-grow: 1;
  margin-top: 50px;

  @media (min-width: 500px) {
    border-left: 1px solid gray;
  }
`;

export const HomepageTestPP = styled.div`
  background-image: url(${profiepic});
  border: 1px solid black;
  border-radius: 50%;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;

  height: 32px;
  width: 32px;
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

export const HomepageFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0px 25px;
  padding-bottom: 8px;
  height: 65px;
  background-color: #000000;

  @media (min-width: 500px) {
    flex-direction: column;
    height: fit-content;
    margin-top: 50px;
    justify-content: flex-start;
    padding: 05px 10px;
    gap: 20px;
  }
`;

export const HomepageFooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 46px;
  width: 46px;

  img {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(31deg)
      brightness(110%) contrast(102%);
    max-height: 32px;
    max-width: 32px;
  }
`;

export const HomepageWriteTweet = styled.div`
  cursor: pointer;
  position: fixed;
  right: 5%;
  bottom: 10%;
  border-radius: 100%;
  background-color: #1d9bf0;
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.5;
  }

  @media (min-width: 500px) {
    position: inherit;
    width: 46px;
    height: 46px;
  }

  img {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(31deg)
      brightness(110%) contrast(102%);
    height: 60%;
    width: 60%;
  }
`;
