import styled from 'styled-components';
import backArrowSVG from '../../assets/images/arrow-left.svg';

export const BackArrow = styled.div`
  background-image: url(${backArrowSVG});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;

  width: 32px;
  height: 32px;
  background-color: #ffff;
  z-index: 25;

  &:hover {
    background-color: gray;
  }
`;

export const SingleTweetPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

export const SingleTweetPageProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px;
  transition: ease-in-out 150ms;
  border-radius: 5px;

  &:hover {
    background-color: #16181c;
  }
`;

export const SingleTweetPageProfileText = styled.p`
  color: #eff3f4;
  margin-left: 10px;
  font-weight: 700;
  font-size: 1.1rem;
`;

export const SingleTweetPageTweet = styled.p`
  color: #eff3f4;
  font-size: 1.5rem;
`;

export const SingleTweetPageInteractionsContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px;
  border-top: 1px solid #2f3336;
  border-bottom: 1px solid #2f3336;
  color: #71767b;
`;

export const SingleTweetPageReplyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  width: 100%;
`;
