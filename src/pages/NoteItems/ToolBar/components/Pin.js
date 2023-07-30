import React from "react";
import outlinePin from "../../Assets/outlinePin.svg";
import filledPin from "../../Assets/filledPin.svg";

const Pin = ({ pinned, pinNote }) => {
  return (
    <div onClick={() => pinNote()}>
      {!pinned ? (
        <img src={outlinePin} title="pin note" className="btn-pin" alt="pin" />
      ) : (
        <img
          src={filledPin}
          title="unpin note"
          className="btn-pin"
          alt="unpin"
        />
      )}
    </div>
  );
};

export default Pin;
