import "./navBar.css";
import { Link } from "react-router";
import { MdHome } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { PiRecordFill } from "react-icons/pi";
import { useState } from "react";

function NavBar() {
  const [activeTab, setActiveTab] = useState("home");

  const handleClick = (e) => {
    const targetId = e.currentTarget.id;
    setActiveTab(targetId);
  };

  return (
    <nav className="navContainer">
      <ul className="nav-links">
        <li className="icon-cont">
          <Link
            id="home"
            className={
              activeTab === "home" ? "link-button active" : "link-button"
            }
            onClick={handleClick}
            href="#"
            to="/"
          >
            <MdHome className=" home-icon nav-icon" />
          </Link>
        </li>
        <li className="icon-cont">
          <Link
            id="record"
            className={
              activeTab === "record" ? "link-button active" : "link-button"
            }
            onClick={handleClick}
            href="#"
            to="record"
          >
            <PiRecordFill className="record-icon nav-icon" />
          </Link>
        </li>
        <li className="icon-cont">
          <Link
            id="followers"
            className={
              activeTab === "followers" ? "link-button active" : "link-button"
            }
            onClick={handleClick}
            href="#"
            to="followers"
          >
            <FaUserFriends className="friends-icon nav-icon" />
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
