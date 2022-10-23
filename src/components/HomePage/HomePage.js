import {
  HomepageFooter,
  HomepageFooterContainer,
  HomepageHeader,
  HomepageMain,
  HomepageStar,
  HomepageTestPP,
  HomepageTweetsContainer,
  HomepageTweetContainer,
} from '../../styles/HomePageStyles/HomePage.styled';
import { UserAuth } from '../../context/authContext';
import starSVG from '../../assets/images/star-svg.svg';
import homeButton from '../../assets/images/home-svg.svg';
import searchButton from '../../assets/images/search-svg.svg';
import notificationButton from '../../assets/images/bell-svg.svg';
import messagesButton from '../../assets/images/email-svg.svg';
import tweetButton from '../../assets/images/pencil-svg.svg';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // navigate
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToTweet = () => {
    navigate('/tweet');
  };

  // return <h1>Hello {user ? user.displayName : 'Guest'}</h1>;

  return (
    <HomepageMain>
      <HomepageHeader>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <HomepageTestPP></HomepageTestPP>
          <div style={{ marginLeft: 15 }}>
            <p style={{ fontSize: 15, fontWeight: 'bold' }}>Latest Tweets</p>
          </div>
        </div>

        <HomepageStar>
          <img src={starSVG} alt="tweet options button"></img>
        </HomepageStar>
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
