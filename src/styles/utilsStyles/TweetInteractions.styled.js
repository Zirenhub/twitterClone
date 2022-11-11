import styled from 'styled-components';

export const TweetInteractContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 90px;
  margin-top: 10px;
`;

export const TweetIntButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 35px;
  width: 35px;

  &:hover {
    p {
      color: ${(props) => props.hoverColor};
    }

    svg {
      background-color: ${(props) => props.hoverColor};
    }
  }
`;

export const TweetInteractText = styled.p`
  padding-left: 5px;
  color: #71767b;
  font-weight: 700;
`;

export const LikeIcon = styled.svg`
  cursor: pointer;

  height: 15px;
  width: 15px;

  background-color: ${(props) => (props.isLiked ? '#FF5C5C' : '#ffff')};
  mask: ${({ src }) => `url(${src}) no-repeat center`};
`;

export const CommentIcon = styled.svg`
  cursor: pointer;

  height: 20px;
  width: 20px;

  /* background-color: ${(props) => (props.isLiked ? '#FF5C5C' : '#ffff')}; */
  background-color: #ffff;
  mask: ${({ src }) => `url(${src}) no-repeat center`};
`;

export const RetweetIcon = styled.svg`
  cursor: pointer;

  height: 20px;
  width: 20px;

  /* background-color: ${(props) => (props.isLiked ? '#FF5C5C' : '#ffff')}; */
  background-color: #ffff;
  mask: ${({ src }) => `url(${src}) no-repeat center`};
`;
