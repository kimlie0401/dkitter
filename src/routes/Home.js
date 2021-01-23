import React, { useState } from "react";

const Home = () => {
  const [dweet, setDweet] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDweet(value);
  };

  return (
    <div>
      <form>
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
