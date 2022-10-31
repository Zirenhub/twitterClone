import styled from 'styled-components';
import optionsSVG from '../../assets/images/options-svgrepo-com.svg';

export const TweetContent = styled.div`
  margin-left: 10px;
  width: 100%;
`;

export const TweetWhite = styled.p`
  color: #eff3f4;
`;

export const TweetWhiteBold = styled.p`
  color: #eff3f4;
  font-weight: 700;
`;

export const TweetGrayText = styled.p`
  color: #71767b;
`;
export const TweetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #71767b;
  transition: ease-in-out 100ms;
  cursor: pointer;
  max-width: 600px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  @media (min-width: 600px) {
    border-right: 1px solid gray;
  }
`;

export const TweetOptions = styled.div`
  background-image: url(${optionsSVG});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;

  margin-left: auto;

  width: 32px;
  height: 23px;

  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(31deg)
    brightness(110%) contrast(102%);
`;

export const TweetDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 5%;
  z-index: 2;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 8px 12px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.14);
      cursor: pointer;
    }
  }
`;
