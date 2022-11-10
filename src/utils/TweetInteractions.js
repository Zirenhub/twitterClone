import {
  TweetInteractContainer,
  TweetIntButtonContainer,
  TweetInteractText,
  InteractIcon,
} from '../styles/utilsStyles/TweetInteractions.styled';
import LikeTweetIcon from '../assets/images/like-svgrepo-com.svg';
import RetweetTweetIcon from '../assets/images/retweet-svgrepo-com.svg';
import CommentTweetIcon from '../assets/images/comment-svgrepo-com.svg';

const TweetInteractions = (props) => {
  const {
    likes,
    retweets,
    comments,
    handleLike,
    handleComment,
    handleRetweet,
  } = props;

  return (
    <TweetInteractContainer>
      <TweetIntButtonContainer hoverColor="#63C5DA" onClick={handleComment}>
        <InteractIcon src={CommentTweetIcon} />
        <TweetInteractText>{comments}</TweetInteractText>
      </TweetIntButtonContainer>
      <TweetIntButtonContainer hoverColor="#32CD32" onClick={handleRetweet}>
        <InteractIcon src={RetweetTweetIcon} />
        <TweetInteractText>{retweets}</TweetInteractText>
      </TweetIntButtonContainer>
      <TweetIntButtonContainer hoverColor="#FF5C5C" onClick={handleLike}>
        <InteractIcon src={LikeTweetIcon} />
        <TweetInteractText>{likes}</TweetInteractText>
      </TweetIntButtonContainer>
    </TweetInteractContainer>
  );
};

export default TweetInteractions;
