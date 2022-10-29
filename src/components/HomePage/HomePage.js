import {
  HomepageHeader,
  HomepageSignout,
  HomepageTestPP,
  HomepageTweetFeedContainer,
} from '../../styles/HomePageStyles/HomePage.styled';
import { UserAuth } from '../../context/authContext';
import signOut from '../../assets/images/sign-out-svg.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../utils/Footer';
import { useEffect, useState } from 'react';
import getAllTweets from './getAllTweets';
import { LoadingStyled } from '../../styles/WelcomePageStyles/Loading.styled';
import {
  ProfileTweetContainer,
  ProfileTweetContent,
  ProfileWhiteBold,
  ProfileGrayText,
  ProfileWhite,
  ProfileMain,
} from '../../styles/ProfilePageStyles/ProfilePage.styled';
import TweetInteractions from '../../utils/TweetInteractions';

const HomePage = () => {
  const [allTweets, setAllTweets] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { logout } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleSwitchToTweet = () => {
    navigate('/tweet', { state: { background: location } });
  };

  const handleScrollUp = () => {
    document.getElementById('scroll').scrollTo(0, 0);
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
          <HomepageHeader>
            <div
              onClick={handleScrollUp}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <HomepageTestPP onClick={handleSwitchToProfile}></HomepageTestPP>
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
          <HomepageTweetFeedContainer id="scroll">
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
                        <TweetInteractions></TweetInteractions>
                      </ProfileTweetContent>
                    </div>
                  </ProfileTweetContainer>
                );
              })}
          </HomepageTweetFeedContainer>
          <Footer navigateToTweet={handleSwitchToTweet}></Footer>
        </ProfileMain>
      )}
    </>
  );
};

export default HomePage;
