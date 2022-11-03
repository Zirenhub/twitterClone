import {
  FooterContainer,
  FooterButtonContainer,
  FooterWriteTweet,
  FooterProfile,
  FooterProfileExtended,
} from '../../styles/utilsStyles/Footer.styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomepageTestPP } from '../../styles/HomePageStyles/HomePage.styled';
import { ProfileMain } from '../../styles/ProfilePageStyles/ProfilePage.styled';
import { UserAuth } from '../../context/authContext';
import homeButton from '../../assets/images/home-svg.svg';
import searchButton from '../../assets/images/search-svg.svg';
import notificationButton from '../../assets/images/bell-svg.svg';
import messagesButton from '../../assets/images/email-svg.svg';
import tweetButton from '../../assets/images/pencil-svg.svg';

const WithFooter = (OriginalComponent) => {
  const NewComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = UserAuth();

    const navigateToTweet = () => {
      navigate('/tweet', { state: { background: location } });
    };

    const navigateToHome = () => {
      navigate('/homepage');
    };

    const navigateToProfile = () => {
      navigate(`/${user.uid}`);
    };

    return (
      <ProfileMain>
        <OriginalComponent />
        <FooterContainer>
          <FooterButtonContainer onClick={navigateToHome} text={'Home'}>
            <img src={homeButton} alt="home button"></img>
          </FooterButtonContainer>
          <FooterButtonContainer text={'Search'}>
            <img src={searchButton} alt="search button"></img>
          </FooterButtonContainer>
          <FooterButtonContainer text={'Notifications'}>
            <img src={notificationButton} alt="notification button"></img>
          </FooterButtonContainer>
          <FooterButtonContainer text={'Messages'}>
            <img src={messagesButton} alt="messages button"></img>
          </FooterButtonContainer>

          <FooterWriteTweet onClick={navigateToTweet} text={'Tweet'}>
            <img src={tweetButton} alt="write tweet button"></img>
          </FooterWriteTweet>

          <FooterProfile onClick={navigateToProfile}></FooterProfile>
          <FooterProfileExtended onClick={navigateToProfile}>
            <HomepageTestPP style={{ height: 42, width: 42 }}></HomepageTestPP>
            <p>{user.displayName}</p>
          </FooterProfileExtended>
        </FooterContainer>
      </ProfileMain>
    );
  };

  return NewComponent;
};

export default WithFooter;
