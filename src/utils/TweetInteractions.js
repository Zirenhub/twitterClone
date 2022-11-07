import {
  TweetCommentButton,
  TweetLikeButton,
  TweetRetweetButton,
  TweetInteractContainer,
  TweetIntButtonContainer,
} from '../styles/utilsStyles/TweetInteractions.styled';
import commentIcon from '../assets/images/comment-svgrepo-com.svg';
import retweetIcon from '../assets/images/retweet-svgrepo-com.svg';
import likeIcon from '../assets/images/like-svgrepo-com.svg';

const TweetInteractions = (props) => {
  const { likes, retweets, comments } = props;

  return (
    <TweetInteractContainer>
      <TweetIntButtonContainer>
        <p>{comments}</p>
        <TweetCommentButton src={commentIcon}></TweetCommentButton>
      </TweetIntButtonContainer>
      <TweetIntButtonContainer>
        <p>{retweets}</p>
        <TweetRetweetButton src={retweetIcon}></TweetRetweetButton>
      </TweetIntButtonContainer>
      <TweetIntButtonContainer>
        <p>{likes}</p>
        <TweetLikeButton src={likeIcon}></TweetLikeButton>
      </TweetIntButtonContainer>
    </TweetInteractContainer>
  );
};

export default TweetInteractions;
