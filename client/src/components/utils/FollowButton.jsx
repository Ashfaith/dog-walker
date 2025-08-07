import { useState } from "react";

//send requests
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

const FollowButton = ({ follower }) => {
  const [buttonPressed, setButtonPressed] = useState(false);

  const onClick = () => {
    setButtonPressed(true);
    sendFollowRequest(follower.followerId);
  };
  const text = buttonPressed ? "Reqeusted" : "Follow";

  return (
    <button buttonPressed={buttonPressed} onClick={onClick}>
      {text}
    </button>
  );
};

export default FollowButton;
