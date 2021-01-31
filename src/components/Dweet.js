import React, { useState } from "react";
import { dbService, storageService } from "../fbase";

const Dweet = ({ dweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newDweet, setNewDweet] = useState(dweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this dweet?");

    if (ok) {
      try {
        await dbService.doc(`dweets/${dweetObj.id}`).delete();
        //   await dbService.collection("dweets").doc(`${dweetObj.id}`).delete();
        if (dweetObj.attachmentUrl) {
          await storageService.refFromURL(dweetObj.attachmentUrl).delete();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`dweets/${dweetObj.id}`).update({ text: newDweet });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your dweet"
                  value={newDweet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update Dweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{dweetObj.text}</h4>
          {dweetObj.attachmentUrl && (
            <img src={dweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Dweet</button>
              <button onClick={toggleEditing}>Edit Dweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dweet;
