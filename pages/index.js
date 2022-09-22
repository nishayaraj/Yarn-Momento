import { useAuth } from '../utils/context/authContext';
import HomeCardRow from '../components/HomeCardRow';
import HomeCard from '../components/HomeCard';
import MiddleHomeCard from '../components/MiddleHomeCard';
import TopMiddleHomeCard from '../components/TopMiddleHomeCard';
import SideMiddleHomeCard from '../components/SideMiddleHomeCard';

function Home() {
  const { user } = useAuth();

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <HomeCardRow>
        <HomeCard />
        <TopMiddleHomeCard>
          View journals
        </TopMiddleHomeCard>
        <HomeCard />
      </HomeCardRow>
      <HomeCardRow>
        <SideMiddleHomeCard>
          Add journal
        </SideMiddleHomeCard>
        <MiddleHomeCard>
          <p>Hello {user.displayName}!</p>
          <p>Come, Weave your Stories with Yarn Momento</p>
          <p>&quot;Some stories should be out of mind, but not out of sight...&quot;</p>
        </MiddleHomeCard>
        <SideMiddleHomeCard>
          Add stories
        </SideMiddleHomeCard>
      </HomeCardRow>
      <HomeCardRow>
        <HomeCard />
        <TopMiddleHomeCard>
          View stories
        </TopMiddleHomeCard>
        <HomeCard />
      </HomeCardRow>
    </div>
  );
}

export default Home;

/** *
 * <div
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
      <h3>Come, Weave your Stories with Yarn Momento</h3>
      <h3>&quot;Some stories should be out of mind, but not out of sight...&quot;</h3>
    </div>
 *
 */
