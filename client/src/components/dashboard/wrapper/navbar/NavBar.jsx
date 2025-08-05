import "./navBar.css";
import { Link } from "react-router";

function NavBar() {
  return (
    <nav className="navContainer">
      <ul className="nav-links">
        <li>
          <Link href="#" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="#" to="record">
            Record
          </Link>
        </li>
        <li>
          <Link href="#" to="friends">
            Friends
          </Link>
        </li>
        {/* <li>
          <Link href="#" to="activity">
            Your Activity
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default NavBar;
