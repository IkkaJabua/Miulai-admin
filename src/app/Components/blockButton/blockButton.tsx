import React, { useState } from "react";
import "./BlockButton.scss"; // SCSS file

interface BlockButtonProps {
  userId: string; // Unique identifier for the user
}

const BlockButton: React.FC<BlockButtonProps> = ({ userId }) => {
  const [isBlocked, setIsBlocked] = useState(false);

  const handleBlockUser = () => {
    // Here you can make an API call to block/unblock the user using userId
    // console.log(`${isBlocked ? "Unblocking" : "Blocking"} user with ID: ${userId}`);
    setIsBlocked(!isBlocked);
  };

  return (
    <button
      className={`block-button ${isBlocked ? "blocked" : ""}`}
      onClick={handleBlockUser}
    >
      <span className="icon">{isBlocked ? "🔓" : "🔒"}</span> {/* icon */}
      {isBlocked ? "Unblock" : "Block"}
    </button>
  );
};

export default BlockButton;
