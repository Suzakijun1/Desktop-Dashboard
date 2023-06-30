import React, { useState, useEffect } from "react";
import Weather from "../components/Weather";
import Navbar from "../components/Navbar";
import Button from "../todolistComponents/Button";
export default function Playtest() {

  return (
      <div className="container">
        <Weather />
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
  );
}
