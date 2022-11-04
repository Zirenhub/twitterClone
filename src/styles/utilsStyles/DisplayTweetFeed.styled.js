import styled from 'styled-components';
import optionsSVG from '../../assets/images/options-svgrepo-com.svg';

export const TweetContent = styled.div`
  margin-left: 10px;
  width: 100%;
`;

export const TweetWhite = styled.p`
  color: #eff3f4;
`;

export const TweetOwnerName = styled.p`
  color: #eff3f4;
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
`;

export const TweetGrayText = styled.p`
  color: #71767b;
`;
export const TweetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #2f3336;
  transition: ease-in-out 100ms;
  cursor: pointer;
  max-width: 600px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  @media (min-width: 600px) {
    border-right: 1px solid #2f3336;
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
`;

export const TweetDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 5%;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #eff3f4;
  background-color: #000000;

  ul {
    list-style: none;
    outline: none;
    padding: 0;
    margin: 0;

    border-radius: 5px;
  }

  li {
    padding: 4px 12px;
    transition: ease-in-out 100ms;

    &:hover {
      background-color: #d90e0a;
      cursor: pointer;
    }
  }
`;
