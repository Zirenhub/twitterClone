import {
  HomepageFooter,
  HomepageFooterContainer,
} from '../../styles/HomePageStyles/HomePage.styled';
import homeButton from '../../assets/images/home-svg.svg';
import searchButton from '../../assets/images/search-svg.svg';
import notificationButton from '../../assets/images/bell-svg.svg';
import messagesButton from '../../assets/images/email-svg.svg';

const Footer = () => {
  return (
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
  );
};

export default Footer;
