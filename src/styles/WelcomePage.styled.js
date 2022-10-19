import styled from 'styled-components';
import twitterSideImage from '../assets/images/lohp_en_1302x955.png';
import twitterBird from '../assets/images/twitter_icon_white.png';

const MainContainer = styled.div`
  display: flex;

  flex-direction: column-reverse;
  @media (min-width: 900px) {
    height: 100vh;
    width: 100vw;
    flex-direction: row;
  }
`;

const SideImage = styled.div`
  background-image: url(${twitterSideImage});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  position: relative;

  flex-grow: 1;
  min-height: 500px;
`;

const TwitterBird = styled.div`
  background-image: url(${twitterBird});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  position: absolute;
  top: 50%;
  left: 50%;

  width: 150px;
  height: 150px;
`;

const MainContent = styled.div`
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 800px;
  flex-shrink: 0;

  @media (min-width: 900px) {
    min-width: 45vw;
  }
`;

const MainContentContainer = styled.div`
  max-width: 600px;
  max-height: 820px;
  padding: 20px;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 100px;
  color: #e7e9ea;

  @media (max-width: 900px) {
    text-align: center;
    width: 450px;
  }
`;

const InteractionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  align-items: center;
  min-height: 100%;
`;

const InteractionsTitle = styled.h1`
  color: #e7e9ea;
  margin-bottom: 30px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LineSeperator = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: #ffffff;
  font-size: 1rem;

  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    background: rgba(255, 255, 255, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 6px;
  }
`;

const Button = styled.button`
  width: 300px;
  height: 44px;
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 20px;
  cursor: pointer;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  background-image: url(${(props) => props.icon});
  background-repeat: no-repeat;
  background-position: 42px center;
  background-size: 24px;
  font-weight: 700;

  &:hover {
    opacity: 0.9;
  }
`;

const ExisitngAccountTitle = styled.p`
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 10px;
`;

const ExistingAccountContainer = styled.div`
  margin-top: 50px;
`;

export {
  MainContainer,
  SideImage,
  MainContent,
  MainTitle,
  MainContentContainer,
  InteractionsContainer,
  InteractionsTitle,
  ButtonsContainer,
  Button,
  LineSeperator,
  ExisitngAccountTitle,
  ExistingAccountContainer,
  TwitterBird,
};
