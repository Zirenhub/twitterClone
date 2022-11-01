import {
  HomepageHeader,
  HomepageSignout,
  HomepageTestPP,
  HomepageTweetFeedContainer,
} from '../../styles/HomePageStyles/HomePage.styled';
import { UserAuth } from '../../context/authContext';
import { LoadingStyled } from '../../styles/WelcomePageStyles/Loading.styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signOut from '../../assets/images/sign-out-svg.svg';
import getAllTweets from './getAllTweets';
import WithFooter from '../HOC/WithFooter';
import DispalyTweetFeed from '../../utils/DispalyTweetFeed';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [allTweets, setAllTweets] = useState([]);

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

  const handleScrollUp = () => {
    document.getElementById('scroll').scrollTo(0, 0);
  };

  const fetchAllTweets = async () => {
    try {
      const res = await getAllTweets();
      if (res) {
        const sortedTweets = [...res].sort((a, b) => b.date - a.date);
        setAllTweets(sortedTweets);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log('render homepage');
    fetchAllTweets();
  }, []);

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
          <HomepageTestPP onClick={handleSwitchToProfile}></HomepageTestPP>
          <div style={{ marginLeft: 15 }}>
            <p style={{ fontSize: 15, fontWeight: 'bold' }}>Latest Tweets</p>
          </div>
        </div>

        <HomepageSignout onClick={handleLogout}>
          <img src={signOut} alt="sign out button"></img>
        </HomepageSignout>
      </HomepageHeader>
      <DispalyTweetFeed initialTweets={allTweets}></DispalyTweetFeed>
    </HomepageTweetFeedContainer>
  );
};

export default WithFooter(HomePage);
