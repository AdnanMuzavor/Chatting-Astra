import React, { useState } from "react";

const SearchResultMiniCard = ({ key, name, pic, Add }) => {
  return (
    <>
      {" "}
      <div
        className="col-md-8 col-lg-8 col-10  grpwrap"
        onClick={() => Add()}
      >
        <img src={pic} alt="" className="img-fluid avatar" />
        <h5>{name}</h5>
      </div>
    </>
  );
};

export default SearchResultMiniCard;
