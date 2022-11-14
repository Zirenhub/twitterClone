import styled from 'styled-components';

export const MessagesPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 600px;

  @media (min-width: 600px) {
    border-right: 1px solid #2f3336;
  }
`;

export const MessagesPageHeader = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #2f3336;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0px 15px;
  color: #eff3f4;

  & > p {
    font-weight: 700;
    font-size: 2rem;
  }
`;

export const ChatMessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  height: 100%;
`;

export const ChatContentContainer = styled.div`
  flex-grow: 1;
`;

export const ChatReplyArea = styled.input`
  margin: 5px;
  padding: 5px 5px;
  border: 1px solid #2f3336;
  flex-grow: 1;
  outline: none;
  color: #eff3f4;
  background-color: black;
`;
