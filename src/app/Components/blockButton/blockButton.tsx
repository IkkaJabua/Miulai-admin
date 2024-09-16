import React, { useState } from "react";
import "./BlockButton.scss"; // SCSS ფაილი

interface BlockButtonProps {
  userId: string; // ან რაიმე უნიკალური იდენტიფიკატორი
}

const BlockButton: React.FC<BlockButtonProps> = ({ userId }) => {
  const [isBlocked, setIsBlocked] = useState(false);

  const handleBlockUser = () => {
    // აქ შეიძლება API გამოძახება იუზერის დაბლოკვისთვის
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
