import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import LoggedoutAllStories from '../components/LoggedoutAllStories';
import NavBar from '../components/NavBar';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading } = useAuth();
  if (userLoading) {
    return <Loading />;
  }

  if (user) {
    return (
      <>
        <NavBar />
        <div className="container page-container">
          <Component {...pageProps} />
        </div>
      </>
    );
  }

  return (
    <div className="container page-container">
      <LoggedoutAllStories />
    </div>
  );
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
