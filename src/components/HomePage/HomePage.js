import { UserAuth } from '../../context/authContext';

const HomePage = () => {
  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // navigate
    } catch (error) {
      console.log(error);
    }
  };

  return <h1>Hello {user ? user.displayName : 'Guest'}</h1>;
};

export default HomePage;
