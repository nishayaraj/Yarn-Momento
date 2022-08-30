import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
        fontFamily: 'cursive',
      }}
    >
      <h1>Hello {user.displayName}! </h1>
      <h3>Come, Weave your Stories...</h3>
    </div>
  );
}

export default Home;
