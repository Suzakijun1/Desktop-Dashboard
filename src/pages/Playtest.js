import React, { useEffect } from "react";
import Weather from "../components/Weather";

export default function Playtest() {

  



  return (
    <div>
      <h1>Welcome to the Playtest Page!</h1>
      <Weather />
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
}
