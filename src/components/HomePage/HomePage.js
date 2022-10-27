import {
  HomepageHeader,
  HomepageMain,
  HomepageSignout,
  HomepageTestPP,
  HomepageTweetsContainer,
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

const HomePage = () => {
  const [allTweets, setAllTweets] = useState(null);
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

  const fetchAllTweets = async () => {
    setLoading(true);
    try {
      const res = await getAllTweets();
      if (res) {
        setAllTweets(res);
        console.log('got tweets');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllTweets();
  }, []);

  useEffect(() => {
    const mergeTweets = () => {
      console.log('merging');
      allTweets.forEach((userTweets) => {
        userTweets.forEach((tweet) => {
          const convertToArray = Object.entries(tweet);
          setMergedData((prevVal) => [...prevVal, convertToArray]);
          console.log('yes sir');
        });
      });
      setLoading(false);
    };

    if (allTweets) mergeTweets();
  }, [allTweets]);

  return (
    <>
      {loading ? (
        <LoadingStyled>Loading</LoadingStyled>
      ) : (
        <HomepageMain>
          <HomepageHeader>
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
          <HomepageTweetsContainer>
            <HomepageWriteTweet onClick={navigateToTweet}>
              <img src={tweetButton} alt="write tweet button"></img>
            </HomepageWriteTweet>
            {/* {mergedData &&
              mergedData.map((tweet) => {
                return (
                  <div key={tweet[0][0]}>
                    <p>{tweet[0][1].tweet}</p>
                    <p>{tweet[0][1].firestoreDate}</p>
                    <p>{tweet[1][1].userName}</p>
                  </div>
                );
              })} */}
          </HomepageTweetsContainer>
          <Footer></Footer>
        </HomepageMain>
      )}
    </>
  );
};

export default HomePage;
