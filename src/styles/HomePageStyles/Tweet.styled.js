import styled from 'styled-components';

export const TweetMain = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #000000;
  padding: 20px;
`;

export const TweetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
`;

export const TweetButton = styled.button`
  background-color: #0e4e78;
  color: #9bbecd;
  font-weight: bold;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 20px;
  border: none;
  outline: none;
`;

export const TweetContent = styled.div`
  display: flex;
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

  textarea {
    background-color: transparent;
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
