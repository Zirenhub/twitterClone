import {
  FooterContainer,
  FooterButtonContainer,
  FooterWriteTweet,
} from '../../styles/utilsStyles/Footer.styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMain } from '../../styles/ProfilePageStyles/ProfilePage.styled';
import homeButton from '../../assets/images/home-svg.svg';
import searchButton from '../../assets/images/search-svg.svg';
import notificationButton from '../../assets/images/bell-svg.svg';
import messagesButton from '../../assets/images/email-svg.svg';
import tweetButton from '../../assets/images/pencil-svg.svg';

const WithFooter = (OriginalComponent) => {
  const NewComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToTweet = () => {
      navigate('/tweet', { state: { background: location } });
    };

    const navigateToHome = () => {
      navigate('/homepage');
    };

    return (
      <ProfileMain>
        <OriginalComponent />
        <FooterContainer>
          <FooterButtonContainer onClick={navigateToHome}>
            <img src={homeButton} alt="home button"></img>
          </FooterButtonContainer>
          <FooterButtonContainer>
            <img src={searchButton} alt="search button"></img>
          </FooterButtonContainer>
          <FooterButtonContainer>
            <img src={notificationButton} alt="notification button"></img>
          </FooterButtonContainer>
          <FooterButtonContainer>
            <img src={messagesButton} alt="messages button"></img>
          </FooterButtonContainer>

          <FooterWriteTweet onClick={navigateToTweet}>
            <img src={tweetButton} alt="write tweet button"></img>
          </FooterWriteTweet>
        </FooterContainer>
      </ProfileMain>
    );
  };

  return NewComponent;
};

export default WithFooter;