import {
  HeaderProfilePP,
  HomepageHeader,
  HomepageSignout,
  HomepageTweetFeedContainer,
} from '../../styles/HomePageStyles/HomePage.styled';
import { UserAuth } from '../../context/authContext';
import { LoadingStyled } from '../../styles/WelcomePageStyles/Loading.styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import signOut from '../../assets/images/sign-out-svg.svg';
import getAllTweets from './getAllTweets';
import WithFooter from '../HOC/WithFooter';
import DispalyTweetFeed from '../../utils/DispalyTweetFeed';
import sortTweetByDate from '../../utils/sortTweetsByDate';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [allTweets, setAllTweets] = useState([]);

  const { logout, user } = UserAuth();
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
    navigate(`/${user.displayName}`);
  };

  const handleScrollUp = () => {
    document.getElementById('scroll').scrollTo(0, 0);
  };

  const fetchAllTweets = async () => {
    console.log('homepage fetching all tweets');
    try {
      const res = await getAllTweets();
      if (res) {
        const sortedTweets = sortTweetByDate(res);
        setAllTweets(sortedTweets);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllTweets();
  }, [location]);

  if (loading) {
    return <LoadingStyled>Loading</LoadingStyled>;
  }

  return (
    <HomepageTweetFeedContainer id="scroll">
      <HomepageHeader>
        <div
          onClick={handleScrollUp}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <HeaderProfilePP onClick={handleSwitchToProfile}></HeaderProfilePP>
          <div style={{ marginLeft: 15 }}>
            <p style={{ fontSize: 15, fontWeight: 'bold' }}>Latest Tweets</p>
          </div>
        </div>

        <HomepageSignout onClick={handleLogout}>
          <img src={signOut} alt="sign out button"></img>
        </HomepageSignout>
      </HomepageHeader>
      <DispalyTweetFeed
        initialTweets={allTweets}
        setTweets={setAllTweets}
      ></DispalyTweetFeed>
    </HomepageTweetFeedContainer>
  );
};

export default WithFooter(HomePage);
