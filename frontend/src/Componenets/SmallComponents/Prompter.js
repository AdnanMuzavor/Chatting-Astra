import React from "react";

const Prompter = ({ name }) => {
  return (
    <>
      <div className="prompter_container">
        <h6>Hey {name} so nice to see you!!</h6>
        <h6>No one to chat? Go ahead and search for your friends!!</h6>
        <h6>Happy Chatting</h6>
      </div>
    </>
  );
};

export default Prompter;
