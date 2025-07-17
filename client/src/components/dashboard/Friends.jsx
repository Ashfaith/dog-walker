import { useState, useEffect } from "react";

function Friends() {
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

  const [suggested, setSuggested] = useState([]);

  const getPeople = async () => {
    const res = await fetch("http://localhost:3000/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setSuggested(data);
    }
  };

  useEffect(() => {
    getPeople();
  }, []);

  const sendFollowRequest = async (id) => {
    try {
      const res = await fetch("http://localhost:3000/followers/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(`Follower request sent to ${id}`);
      } else {
        console.error(
          "Server returned an error:",
          res.status,
          data.message || data
        );
      }
    } catch (err) {
      console.error("Network or parsing error:", err);
    }
  };

  return (
    <>
      {console.log(requests)}
      <ul>
        {suggested.map((person, index) => (
          <li key={index}>
            {person.name}
            <button onClick={() => sendFollowRequest(person.id)}>Follow</button>
          </li>
        ))}
      </ul>
      {/* <ul>
        {!requests
          ? null
          : requests.map((request, index) => <li key={index}>{request}</li>)}
      </ul> */}
    </>
  );
}

export default Friends;
