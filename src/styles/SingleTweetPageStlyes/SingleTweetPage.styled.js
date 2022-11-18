import styled from 'styled-components';
import backArrowSVG from '../../assets/images/arrow-left.svg';

export const BackArrow = styled.div`
  background-image: url(${backArrowSVG});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;

  cursor: pointer;
  width: 32px;
  height: 32px;
  background-color: #ffff;
  z-index: 25;

  &:hover {
    background-color: gray;
  }
`;

export const PostContainer = styled.div`
  max-width: 600px;
  border-right: 1px solid #2f3336;
`;

export const SingleTweetPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
`;

export const SingleTweetPageProfile = styled.div`
  display: flex;
  align-items: center;
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

export const PostLine = styled.div`
  border-left: 2px solid gray;
  flex-grow: 1;
  align-self: center;
`;
