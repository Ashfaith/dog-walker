import { useState, useEffect } from "react";
import { Link } from "react-router";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import FollowButton from "../utils/FollowButton";
import "./followers.css";

function Followers() {
  // get follower requests
  const [requests, setRequests] = useState(null);

  const showFollowRequests = async () => {
    const res = await fetch("http://localhost:3000/followers/view-requests", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setRequests(data);
    }
  };

  useEffect(() => {
    showFollowRequests();
  }, []);

  //get followers
  const [followers, setFollowers] = useState([]);

  const getFollowers = async () => {
    try {
      const res = await fetch("http://localhost:3000/followers/all-followers", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setFollowers(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFollowers();
  }, []);

  //send requests
  const sendFollowRequest = async (id) => {
    try {
      await fetch("http://localhost:3000/followers/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  //handle follow requests
  const handleRequest = async (action, requestId) => {
    try {
      const res = await fetch(
        "http://localhost:3000/followers/action-request",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ action, requestId }),
        }
      );
    } catch (err) {
      console.error({ message: err });
    }
  };

  return (
    <div className="friends-content">
      <Link to="/dashboard/people-search">
        <div className="search-container">
          <span className="search-icon">
            <IoIosSearch />
          </span>
          <input className="search-bar" placeholder="Search people" />
        </div>
      </Link>

      {!requests || requests.length <= 0 ? null : (
        <div className="requests-container">
          <h3>Requests</h3>
          <ul>
            {requests.map((request, index) => (
              <li className="request-alert" key={index}>
                <h4>{request.requesterName}</h4>
                <div className="button-container">
                  <FollowButton
                    className="accept"
                    textFalse={"Accept"}
                    textTrue={"Accepted"}
                    onClick={() => handleRequest(true, request.requestId)}
                  />
                  <IoIosClose
                    className="deny-button"
                    onClick={() => handleRequest(false, request.requestId)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <section className="followers-section">
        <h3>Followers</h3>
        <div className="grid-container">
          <ul className="follower-list">
            {!followers
              ? null
              : followers.map((follower, index) => (
                  <li className="follower-container" key={index}>
                    <h4>{`${follower.firstName} ${follower.lastName}`}</h4>
                    {follower.following === false ? (
                      <p>pending</p>
                    ) : !follower.following ? (
                      <FollowButton
                        follower={follower}
                        textTrue={"Requested"}
                        textFalse={"Follow"}
                        onClick={() => sendFollowRequest(follower.followerId)}
                      />
                    ) : (
                      <p>Following</p>
                    )}
                  </li>
                ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Followers;
