import React from "react";

export default function CommonProfile({ Picture }) {
  return (
    <div>
      <img src={Picture} />
      <div>Username</div>
      <div>Bio</div>
    </div>
  );
}
