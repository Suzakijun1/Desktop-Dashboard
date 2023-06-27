import React from "react";

export default function Playtest() {
  return (
    <div>
      <h1>Welcome to the Playtest Page!</h1>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
}
