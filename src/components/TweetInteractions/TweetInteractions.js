import {
  TweetInteractContainer,
  TweetIntButtonContainer,
  TweetInteractText,
  LikeIcon,
  CommentIcon,
  RetweetIcon,
} from '../../styles/utilsStyles/TweetInteractions.styled';
import LikeTweetIcon from '../../assets/images/like-svgrepo-com.svg';
import RetweetTweetIcon from '../../assets/images/retweet-svgrepo-com.svg';
import CommentTweetIcon from '../../assets/images/comment-svgrepo-com.svg';
import { useEffect, useState } from 'react';
import likeTweet from './likeTweet';
import { UserAuth } from '../../context/authContext';
import isTweetLiked from './isTweetLiked';
import unlikeTweet from './unlikeTweet';

const TweetInteractions = (props) => {
  const { tweet } = props;
  const [likes, setLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = UserAuth();

  const handleComment = () => {};

  const handleRetweet = () => {};

  const handleLike = async () => {
    setLoading(true);
    if (!isLiked) {
      const like = await likeTweet(tweet.key, user.uid);
      if (like) {
        setLikes(likes + 1);
        setIsLiked(true);
      }
    } else {
      const unlike = await unlikeTweet(tweet.key, user.uid);
      if (unlike) {
        setLikes(likes - 1);
        setIsLiked(false);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    const checkIsTweetLiked = async () => {
      const promise = await isTweetLiked(tweet.key, user.uid);
      setIsLiked(promise);
    };

    checkIsTweetLiked();
    setLikes(tweet.numOfLikes);
    setLoading(false);
  }, [tweet, user]);

  return (
    <TweetInteractContainer>
      <TweetIntButtonContainer hoverColor="#63C5DA" onClick={handleComment}>
        <CommentIcon src={CommentTweetIcon} />
        <TweetInteractText>{tweet.numOfComments}</TweetInteractText>
      </TweetIntButtonContainer>
      <TweetIntButtonContainer hoverColor="#32CD32" onClick={handleRetweet}>
        <RetweetIcon src={RetweetTweetIcon} />
        <TweetInteractText>{tweet.numOfRetweets}</TweetInteractText>
      </TweetIntButtonContainer>
      {!loading && (
        <TweetIntButtonContainer hoverColor="#FF5C5C" onClick={handleLike}>
          <LikeIcon src={LikeTweetIcon} isLiked={isLiked} />
          <TweetInteractText>{likes}</TweetInteractText>
        </TweetIntButtonContainer>
      )}
    </TweetInteractContainer>
  );
};

export default TweetInteractions;
