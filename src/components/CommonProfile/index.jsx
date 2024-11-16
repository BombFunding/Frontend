import React from "react";

export default function Profile({ Picture }) {
  return (
    <div>
      <img src={Picture} />
      <div>Username</div>
      <div>Bio</div>
    </div>
  );
}
