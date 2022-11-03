import styled from 'styled-components';
import profiepic from '../../assets/images/testpp.png';

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0px 25px;
  padding-bottom: 8px;
  height: 65px;
  background-color: #000000;
  border-top: 1px solid gray;
  height: 100%;

  @media (min-width: 500px) {
    flex-direction: column;
    border-top: none;
    padding: 05px 10px;
    gap: 20px;
  }

  @media (min-width: 840px) {
    max-width: 660px;
    flex-grow: 1;
    padding-left: 200px;
  }
`;

export const FooterButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 46px;
  width: 46px;

  @media (min-width: 840px) {
    &::after {
      content: '${(props) => props.text}';
      color: #eff3f4;
      font-weight: 700;
      margin-left: 10px;
      /* margin-right: auto; */
    }
    width: 200px;
    border-radius: 10px;
    /* padding-left: 10px; */
    justify-content: flex-start;
    &:hover {
      background-color: #16181c;
    }
  }

  img {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(31deg)
      brightness(110%) contrast(102%);
    max-height: 32px;
    max-width: 32px;
  }
`;

export const FooterWriteTweet = styled.div`
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
  transition: ease-in-out 100ms;

  &:hover {
    background-color: #0047ab;
  }

  @media (min-width: 500px) {
    position: inherit;
    width: 46px;
    height: 46px;
  }

  @media (min-width: 840px) {
    border-radius: 5px;
    width: 200px;
    margin-bottom: 10px;

    &::after {
      content: 'Tweet';
      color: #eff3f4;
      font-weight: 700;
    }

    & > img {
      display: none;
    }
  }

  img {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(31deg)
      brightness(110%) contrast(102%);
    height: 60%;
    width: 60%;
  }
`;

export const FooterProfile = styled.div`
  background-image: url(${profiepic});
  border: 1px solid #ffff;
  border-radius: 50%;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  display: none;

  height: 32px;
  width: 32px;

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  @media (min-width: 500px) {
    display: inline-block;
    margin-top: auto;
  }
`;
