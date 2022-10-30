import {
  FooterContainer,
  FooterButtonContainer,
  FooterWriteTweet,
} from '../styles/utilsStyles/Footer.styled';
import homeButton from '../assets/images/home-svg.svg';
import searchButton from '../assets/images/search-svg.svg';
import notificationButton from '../assets/images/bell-svg.svg';
import messagesButton from '../assets/images/email-svg.svg';
import tweetButton from '../assets/images/pencil-svg.svg';

const Footer = (props) => {
  // navigateToHomePage, navigateToExplore
  const { navigateToTweet } = props;

  return (
    <FooterContainer>
      <FooterButtonContainer>
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
  );
};

export default Footer;
