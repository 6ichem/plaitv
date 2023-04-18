import { Link, useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { getLocalAccessToken } from "../../http/utils";
import Channels from "./components/Channels";
import ExploreContent from "./components/ExploreContent";
import styles from "./Explore.module.scss";

export default function Explore() {
  const isAuthenticated = getLocalAccessToken();
  const navigate = useNavigate();
  return (
    <div className={styles.Explore}>
      <div className="flex items-center">
        <button onClick={() => navigate("/")}>
          <Icon name="navbar-logo" className="mr-5" />
        </button>
        {isAuthenticated && (
          <Link
            to="/profile"
            className="text-white text-opacity-60 text-xs font-normal mr-10"
          >
            My profile
          </Link>
        )}
      </div>

      <div className="lg:flex lg:justify-center mt-9 lg:mt-28">
        <div className="flex flex-col">
          <ExploreContent />
          <div className="mt-7 lg:mt-14">
            <Channels />
          </div>
        </div>
      </div>
    </div>
  );
}
