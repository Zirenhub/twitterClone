import {
  HomepageHeader,
  HomepageSignout,
  HomepageTestPP,
  HomepageWriteTweet,
} from '../../styles/HomePageStyles/HomePage.styled';
import { UserAuth } from '../../context/authContext';
import signOut from '../../assets/images/sign-out-svg.svg';
import tweetButton from '../../assets/images/pencil-svg.svg';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import getAllTweets from './getAllTweets';
import { LoadingStyled } from '../../styles/WelcomePageStyles/Loading.styled';
import {
  ProfileTweetFeedContainer,
  ProfileTweetContainer,
  ProfileTweetContent,
  ProfileWhiteBold,
  ProfileGrayText,
  ProfileWhite,
  ProfileTweetInteractContainer,
  ProfileCommentButton,
  ProfileLikeButton,
  ProfileRetweetButton,
  ProfileMain,
} from '../../styles/ProfilePageStyles/ProfilePage.styled';
import commentIcon from '../../assets/images/comment-svgrepo-com.svg';
import retweetIcon from '../../assets/images/retweet-svgrepo-com.svg';
import likeIcon from '../../assets/images/like-svgrepo-com.svg';

const HomePage = () => {
  const [allTweets, setAllTweets] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSwitchToProfile = () => {
    navigate('/profile');
  };

  const navigateToTweet = () => {
    navigate('/tweet');
  };

  useEffect(() => {
    const fetchAllTweets = async () => {
      try {
        const res = await getAllTweets();
        if (res) {
          setAllTweets(res);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    setLoading(true);
    fetchAllTweets();
  }, []);

  useEffect(() => {
    const tweetsArr = [];

    allTweets.forEach((userTweets) => {
      userTweets.forEach((tweet) => {
        const convertToArray = Object.entries(tweet);
        tweetsArr.push(convertToArray);
      });
    });

    const sortedTweets = tweetsArr.sort((a, b) => {
      return new Date(b[0][1].firestoreDate) - new Date(a[0][1].firestoreDate);
    });

    setMergedData(sortedTweets);
  }, [allTweets]);

  return (
    <>
      {loading ? (
        <LoadingStyled>Loading</LoadingStyled>
      ) : (
        <ProfileMain>
          <HomepageWriteTweet onClick={navigateToTweet}>
            <img src={tweetButton} alt="write tweet button"></img>
          </HomepageWriteTweet>
          <ProfileTweetFeedContainer>
            <HomepageHeader>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <HomepageTestPP
                  onClick={handleSwitchToProfile}
                ></HomepageTestPP>
                <div style={{ marginLeft: 15 }}>
                  <p style={{ fontSize: 15, fontWeight: 'bold' }}>
                    Latest Tweets
                  </p>
                </div>
              </div>

              <HomepageSignout onClick={handleLogout}>
                <img src={signOut} alt="sign out button"></img>
              </HomepageSignout>
            </HomepageHeader>
            {mergedData &&
              mergedData.map((tweet) => {
                return (
                  <ProfileTweetContainer key={tweet[0][0]}>
                    <div style={{ display: 'flex' }}>
                      <HomepageTestPP
                        style={{
                          border: '1px solid red',
                          backgroundColor: '#ffffff',
                          minHeight: 48,
                          minWidth: 48,
                          flexGrow: 1,
                        }}
                      ></HomepageTestPP>
                      <ProfileTweetContent>
                        <div style={{ display: 'flex' }}>
                          <ProfileWhiteBold>
                            {tweet[1][1].userName}
                          </ProfileWhiteBold>
                          <ProfileGrayText style={{ marginLeft: 10 }}>
                            {tweet[0][1].firestoreDate.slice(0, 21)}
                          </ProfileGrayText>
                        </div>

                        <ProfileWhite>{tweet[0][1].tweet}</ProfileWhite>
                      </ProfileTweetContent>
                    </div>

                    <ProfileTweetInteractContainer>
                      <ProfileCommentButton
                        src={commentIcon}
                      ></ProfileCommentButton>
                      <ProfileRetweetButton
                        src={retweetIcon}
                      ></ProfileRetweetButton>
                      <ProfileLikeButton src={likeIcon}></ProfileLikeButton>
                    </ProfileTweetInteractContainer>
                  </ProfileTweetContainer>
                );
              })}
          </ProfileTweetFeedContainer>
          <Footer></Footer>
        </ProfileMain>
      )}
    </>
  );
};

export default HomePage;
