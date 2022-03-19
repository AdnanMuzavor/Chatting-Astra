import React, { useState } from "react";

const SearchCard = ({id, pic, name,AccessFn }) => {
  return (
    <>
      <div key={id} className="col-md-2 col-lg-2 col-3 searchcard " onClick={AccessFn}>
        <img
          src={pic}
          alt="img"
          className="rounded-circle img-fluid avatar mt-2"
        />
        <h4 className="text-center mt-2">{name}</h4>
      </div>
    </>
  );
};

export default SearchCard;
