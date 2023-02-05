import React from "react";

const GroupUser = ({ userId, userName, isAdmin, Remove }) => {
  return (
    <>
      <div className="users2 col-md-6 col-lg-6 col-6" key={userId}>
        <h6>{userName.toUpperCase().slice(0, 5)}</h6>
        {isAdmin && (
          <h1
            className="closeicon2"
            onClick={(e) => {
              Remove(userId);
            }}
            title="remove user"
          >
            X
          </h1>
        )}
      </div>
    </>
  );
};

export default GroupUser;
