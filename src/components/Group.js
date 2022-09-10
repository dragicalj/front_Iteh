import { useState } from "react";
import React from "react";

function Group() {
  const [groupName, setGroupName] = useState("");

  React.useEffect(() => {
    // setGroupName1();
  }, []);

  function setGroupName1() {
    groupName = JSON.parse(localStorage.getItem("groupName"));
  }

  return <h1>grupa</h1>;
}

export default Group;
