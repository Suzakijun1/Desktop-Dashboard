import React, { useState, useEffect } from "react";
import Weather from "../components/Weather";
import Navbar from "../components/Navbar";
import Button from "../todolistComponents/Button";
export default function WeatherPage() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    // Update the current date and time every second
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);
  const formattedDateTime = currentDateTime.toLocaleString(undefined, {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <div className="container">
      <div className="Date" style={{ display: "flex", justifyContent: "end" }}>
        {formattedDateTime}
      </div>

      <Weather />
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
}
