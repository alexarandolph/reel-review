import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useToken } from "./useToken";

function Nav() {
  const { token } = useToken();

  if (!token) {
    return null; // hide the navigation bar if the user is not logged in
  }

  return (
    <nav className="bg-gray-300 w-full">
      <ul className="font-sans font-medium">
        <li>
          <Link className="dropdown-item" to="/reviews/list">
            Reviews
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/">
            Home Page
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/movie/detail">
            Movie Detail
          </Link>
        </li>
        {/* <li>
          <Link className="dropdown-item" to="/profile">
            Profile
          </Link>
        </li> */}
        <li>
          <Logout />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
