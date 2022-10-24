import {
  HomepageHeader,
  HomepageMain,
  HomepageSignout,
  HomepageTestPP,
  HomepageTweetsContainer,
  HomepageTweetContainer,
} from '../../styles/HomePageStyles/HomePage.styled';
import { UserAuth } from '../../context/authContext';
import signOut from '../../assets/images/sign-out-svg.svg';
import tweetButton from '../../assets/images/pencil-svg.svg';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const HomePage = () => {
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
        <HomepageTweetContainer onClick={navigateToTweet}>
          <img src={tweetButton} alt="write tweet button"></img>
        </HomepageTweetContainer>
      </HomepageTweetsContainer>
      <Footer></Footer>
    </HomepageMain>
  );
};

export default HomePage;
