import {
  ProfileCommentButton,
  ProfileLikeButton,
  ProfileRetweetButton,
  ProfileTweetInteractContainer,
} from '../styles/ProfilePageStyles/ProfilePage.styled';
import commentIcon from '../assets/images/comment-svgrepo-com.svg';
import retweetIcon from '../assets/images/retweet-svgrepo-com.svg';
import likeIcon from '../assets/images/like-svgrepo-com.svg';

const TweetInteractions = () => {
  return (
    <ProfileTweetInteractContainer>
      <ProfileCommentButton src={commentIcon}></ProfileCommentButton>
      <ProfileRetweetButton src={retweetIcon}></ProfileRetweetButton>
      <ProfileLikeButton src={likeIcon}></ProfileLikeButton>
    </ProfileTweetInteractContainer>
  );
};

export default TweetInteractions;
