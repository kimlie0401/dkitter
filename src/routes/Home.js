import React, { useEffect, useState } from "react";
import Dweet from "../components/Dweet";
import DweetFactory from "../components/DweetFactory";
import { dbService } from "../fbase";

const Home = ({ userObj }) => {
  const [dweets, setDweets] = useState([]);

  //   const getDweets = async () => {
  //     const dbDweets = await dbService.collection("dweets").get();
  //     dbDweets.forEach((document) => {
  //       const dweetObject = {
  //         ...document.data(),
  //         id: document.id,
  //       };
  //       setDweets((prev) => [dweetObject, ...prev]);
  //     });
  //   };

  useEffect(() => {
    dbService
      .collection("dweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const dweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDweets(dweetArray);
      });
  }, []);

  return (
    <div>
      <DweetFactory userObj={userObj} />
      <div>
        {dweets.map((dweet) => (
          <Dweet
            key={dweet.id}
            dweetObj={dweet}
            isOwner={dweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
