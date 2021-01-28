import React from "react";

const Dweet = ({ dweetObj, isOwner }) => (
  <div>
    <h4>{dweetObj.text}</h4>
    {isOwner && (
      <>
        <button>Delete Dweet</button>
        <button>Edit Dweet</button>
      </>
    )}
  </div>
);

export default Dweet;
