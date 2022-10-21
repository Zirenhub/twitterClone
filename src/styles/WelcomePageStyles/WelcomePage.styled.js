import styled from 'styled-components';
import twitterSideImage from '../../assets/images/lohp_en_1302x955.png';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  overflow: auto;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

export const SideImage = styled.div`
  background-image: url(${twitterSideImage});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  position: relative;

  flex-grow: 1;
  min-height: 400px;

  img {
    width: 382px;
    height: 382px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(31deg)
      brightness(110%) contrast(102%);
  }
`;

export const MainContent = styled.div`
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  flex-shrink: 0;
  position: relative;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 1), 0 4px 6px -4px rgb(0 0 0 / 1);

  @media (min-width: 900px) {
    min-width: 45vw;
  }
`;

export const MainContentContainer = styled.div`
  max-width: 600px;
  max-height: 820px;
  padding: 20px;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 820px;
  }
`;

export const MainTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 50px;
  color: #e7e9ea;

  @media (max-width: 900px) {
    text-align: center;
    max-width: 450px;
  }
`;

export const InteractionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  align-items: center;
  min-height: 100%;
`;

export const InteractionsTitle = styled.h1`
  color: #e7e9ea;
  margin-bottom: 30px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const LineSeperator = styled.div`
  display: flex;
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

export const Button = styled.button`
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
  background-position: 10px center;
  background-size: 24px;
  font-weight: 700;

  &:hover {
    opacity: 0.9;
  }
`;

export const ExisitngAccountTitle = styled.p`
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 10px;
  margin-left: 10px;
`;

export const ExistingAccountContainer = styled.div`
  margin-top: 50px;
`;
