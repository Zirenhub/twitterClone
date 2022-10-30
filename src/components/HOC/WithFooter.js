import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMain } from '../../styles/ProfilePageStyles/ProfilePage.styled';
import Footer from '../../utils/Footer';

const WithFooter = (OriginalComponent) => {
  const NewComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSwitchToTweet = () => {
      navigate('/tweet', { state: { background: location } });
    };

    return (
      <ProfileMain>
        <OriginalComponent />
        <Footer navigateToTweet={handleSwitchToTweet}></Footer>
      </ProfileMain>
    );
  };

  return NewComponent;
};

export default WithFooter;
