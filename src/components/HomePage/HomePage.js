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

const HomePage = () => {
  const [allTweets, setAllTweets] = useState(null);

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
    const allTweetsRes = async () => {
      return await getAllTweets();
    };

    setAllTweets(allTweetsRes);
  }, []);

  useEffect(() => {
    console.log(allTweets);
  }, [allTweets]);

  return (
    <HomepageMain>
      <HomepageHeader>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <HomepageTestPP onClick={handleSwitchToProfile}></HomepageTestPP>
          <div style={{ marginLeft: 15 }}>
            <p style={{ fontSize: 15, fontWeight: 'bold' }}>Latest Tweets</p>
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
      </HomepageTweetsContainer>
      <Footer></Footer>
    </HomepageMain>
  );
};

export default HomePage;
