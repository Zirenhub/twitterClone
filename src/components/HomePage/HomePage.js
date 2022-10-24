import {
  HomepageFooter,
  HomepageFooterContainer,
  HomepageHeader,
  HomepageMain,
  HomepageSignout,
  HomepageTestPP,
  HomepageTweetsContainer,
  HomepageTweetContainer,
} from '../../styles/HomePageStyles/HomePage.styled';
import { UserAuth } from '../../context/authContext';
import signOut from '../../assets/images/sign-out-svg.svg';
import homeButton from '../../assets/images/home-svg.svg';
import searchButton from '../../assets/images/search-svg.svg';
import notificationButton from '../../assets/images/bell-svg.svg';
import messagesButton from '../../assets/images/email-svg.svg';
import tweetButton from '../../assets/images/pencil-svg.svg';
import { useNavigate } from 'react-router-dom';

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
      <HomepageFooter>
        <HomepageFooterContainer>
          <img src={homeButton} alt="home button"></img>
        </HomepageFooterContainer>
        <HomepageFooterContainer>
          <img src={searchButton} alt="search button"></img>
        </HomepageFooterContainer>
        <HomepageFooterContainer>
          <img src={notificationButton} alt="notification button"></img>
        </HomepageFooterContainer>
        <HomepageFooterContainer>
          <img src={messagesButton} alt="messages button"></img>
        </HomepageFooterContainer>
      </HomepageFooter>
    </HomepageMain>
  );
};

export default HomePage;
