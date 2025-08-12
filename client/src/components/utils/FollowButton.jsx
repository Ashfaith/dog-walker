import { useState } from "react";

const FollowButton = ({ textTrue, textFalse, onClick, ...props }) => {
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleClick = (e) => {
    setButtonPressed(true);
    onClick(e);
  };
  const text = buttonPressed ? textTrue : textFalse;

  return (
    <button onClick={handleClick} {...props}>
      {text}
    </button>
  );
};

export default FollowButton;
