import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";

const Profile = ({ userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyDweets = async () => {
    const dweets = await dbService
      .collection("dweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get();
    console.log(dweets.docs.map((doc) => doc.data()));
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
  };

  useEffect(() => {
    getMyDweets();
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Dispaly Name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
