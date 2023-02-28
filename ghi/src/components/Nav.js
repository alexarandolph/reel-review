import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useToken } from "./useToken";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Nav() {
  const { pathname } = useLocation();
  const { token } = useToken();
  const navigate = useNavigate()

   const redirect = () => {
if (!token && (pathname !== "/welcome" || pathname !== "/login" || pathname !== "/signup")) {
    navigate("/welcome")
  }
}
  useEffect(() =>{
    redirect()
}, [])

  if (!token) {
    // navigate("/welcome")
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
