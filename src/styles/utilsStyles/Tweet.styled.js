import styled from 'styled-components';

export const TweetMain = styled.div`
  position: absolute;
  height: 99.99%; // strange bug with 100% height
  width: 100%;
  top: 0%;
  left: 0%;
  background: #000000;
  padding: 20px;
  z-index: 300; // should be top priority
  border-radius: 20px;

  @media (min-width: 655px) {
    height: 50%;
    width: 70%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const TweetModalBackground = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 200;
  cursor: pointer;
`;

export const TweetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
`;

export const TweetButton = styled.button`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  font-weight: bold;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 20px;
  border: none;
  outline: none;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const TweetContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  min-height: 30%;
`;

export const TweetPPContainer = styled.div``;

export const TweetTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin-left: 15px;
  max-width: 85%;
`;

export const TweetForm = styled.div`
  display: flex;
  flex-direction: column;
  color: #71767b;
  font-size: 1.2rem;
  height: 100%;

  textarea {
    background-color: transparent;
    height: 50%;
    outline: none;
    color: #efefef;
    font-size: 1.2rem;
    max-width: 100%;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5) !important;
  }
`;
