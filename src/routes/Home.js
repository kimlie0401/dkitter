import React, { useState } from "react";
import { dbService } from "../fbase";

const Home = () => {
  const [dweet, setDweet] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("dweets").add({
      dweet,
      createdAt: Date.now(),
    });
    setDweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={dweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Dweet" />
      </form>
    </div>
  );
};

export default Home;
