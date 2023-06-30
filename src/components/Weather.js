import React, { useEffect, useState } from "react";
import ReactWeather, { useWeatherBit } from "react-open-weather";
import cities from "./cities.json";

const Weather = () => {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState(""); // Separate state for the searched city
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [query, setQuery] = useState("");

  const { data, isLoading, errorMessage } = useWeatherBit({
    key: "e865491682014a589731e8dfce8a4683",
    lat: latitude,
    lon: longitude,
    lang: "en",
    unit: "M",
  });

  useEffect(() => {
    const savedCity = localStorage.getItem("weatherAppCity");
    if (savedCity) {
      setCity(savedCity);
      setSearchedCity(savedCity); // Update the searched city state
    }
  }, []);

  useEffect(() => {
    if (!latitude && !longitude) {
      const selectedCity = cities.find(
        (c) => c.name.toLowerCase() === city.toLowerCase()
      );
      if (selectedCity) {
        setLatitude(selectedCity.lat);
        setLongitude(selectedCity.lng);
      }
    } else {
      setQuery({
        lat: latitude,
        lon: longitude,
        city: "",
      });
      localStorage.setItem("weatherAppCity", city);
    }
  }, [latitude, longitude, setQuery, city]);

  const handleCitySearch = () => {
    const selectedCity = cities.find(
      (c) => c.name.toLowerCase() === city.toLowerCase()
    );
    if (selectedCity) {
      setLatitude(selectedCity.lat);
      setLongitude(selectedCity.lng);
      setSearchedCity(selectedCity.name); // Update the searched city state
    }
  };

  return (
    <div style={{ width: "50%" }}>
      <h1>Weather</h1>
      {/* <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleCitySearch}>Search</button>
      </div> */}
      <ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel={searchedCity} // Use searchedCity as the locationLabel
        unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
        showForecast
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleCitySearch}>Search</button>
    </div>
  );
};

export default Weather;
