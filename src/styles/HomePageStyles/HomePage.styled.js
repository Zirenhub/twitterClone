import styled from 'styled-components';
import profiepic from '../../assets/images/testpp.png';

export const HomepageMain = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #efefef;
  width: 100%;
  height: 100%;
`;

export const HomepageHeader = styled.div`
  display: flex;
  max-height: 50px;
  background-color: #000000;
  align-items: center;
  color: #e7e9ea;
  padding: 15px;
  justify-content: space-between;
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

export const HomepageTweetsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  background-color: #1f1f1f;
  position: relative;
`;

export const HomepageFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0px 25px;
  padding-bottom: 8px;
  height: 65px;
  background-color: #000000;
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
  position: absolute;
  right: 3%;
  bottom: 2%;
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

  img {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(31deg)
      brightness(110%) contrast(102%);
    height: 60%;
    width: 60%;
  }
`;
