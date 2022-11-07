import styled from 'styled-components';

export const TweetInteractContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 90px;
  margin-top: 10px;

  img {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(31deg)
      brightness(110%) contrast(102%);

    height: 24px;
    width: 24px;

    cursor: pointer;
  }
`;

export const TweetIntButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #eff3f4;
`;

export const TweetCommentButton = styled.img``;

export const TweetRetweetButton = styled.img``;

export const TweetLikeButton = styled.img`
  // for some reason like svg is bigger than the others
  width: 18px !important;
`;
