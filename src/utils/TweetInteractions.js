import {
  TweetCommentButton,
  TweetLikeButton,
  TweetRetweetButton,
  TweetInteractContainer,
} from '../styles/utilsStyles/TweetInteractions.styled';
import commentIcon from '../assets/images/comment-svgrepo-com.svg';
import retweetIcon from '../assets/images/retweet-svgrepo-com.svg';
import likeIcon from '../assets/images/like-svgrepo-com.svg';

const TweetInteractions = () => {
  return (
    <TweetInteractContainer>
      <TweetCommentButton src={commentIcon}></TweetCommentButton>
      <TweetRetweetButton src={retweetIcon}></TweetRetweetButton>
      <TweetLikeButton src={likeIcon}></TweetLikeButton>
    </TweetInteractContainer>
  );
};

export default TweetInteractions;
