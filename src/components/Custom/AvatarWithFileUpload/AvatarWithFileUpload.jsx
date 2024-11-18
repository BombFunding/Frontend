import React, { useRef, useState } from "react";
import AVATARIMG from "@/assets/A1.jpg";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const AvatarWithFileUpload = ({ className, defaultAvatar }) => {
  const [imageURL, setImageURL] = useState(""); // State to hold the selected image URL
  const fileInputRef = useRef(null);

  // Function to handle file input change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to trigger file input click
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={`${className}`} style={{ textAlign: "center" }}>
      <Avatar
        // src={imageURL || AVATARIMG} // Display a default avatar image if none is selected
        // alt="User Avatar"
        // size="large" // Customize size according to your preference
        onClick={handleAvatarClick} // Trigger file selection on avatar click
        // style={{ cursor: "pointer" }} // Change cursor to pointer indicating it's clickable
        className={`w-24 h-24 flex justify-center items-center relative overflow-hidden`}
      >
        <div className="w-full h-full top-1/2 absolute bg-black opacity-25" />
        <CameraAltIcon className="absolute top-[60%] text-white opacity-90" />
        <AvatarImage
          src={imageURL || AVATARIMG}
          alt="User Avatar"
          size="large"
        />
      </Avatar>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }} // Hide the file input element
        ref={fileInputRef} // Attach input to useRef
        onChange={handleImageChange} // Handle file selection
      />
    </div>
  );
};

export default AvatarWithFileUpload;
