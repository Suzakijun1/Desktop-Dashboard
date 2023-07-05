import React, { useEffect, useState } from "react";
import ReactWeather, { useWeatherBit } from "react-open-weather";
import cities from "./cities.json";
import Autosuggest from "react-autosuggest";
import { is } from "date-fns/locale";

const Weather = () => {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [location, setLocation] = useState({
    latitude: "28.53834",
    longitude: "-81.37924",
  });
  const [suggestions, setSuggestions] = useState([]);

  const { data, isLoading, errorMessage } = useWeatherBit({
    key: "e865491682014a589731e8dfce8a4683",
    lat: location.latitude,
    lon: location.longitude,
    lang: "en",
    unit: "M",
  });
  // useEffect(() => {
  //   console.log("Location:", location);
  //   console.log("API Request URL:", isLoading);
  //   console.log("API Request URL2:", generateApiRequestUrl());
  // }, [location]);

  // const generateApiRequestUrl = () => {
  //   if (location && location.latitude !== null && location.longitude !== null) {
  //     const url = `https://api.weatherbit.io/v2.0/current?key=e865491682014a589731e8dfce8a4683&lat=${location.latitude}&lon=${location.longitude}&lang=en&units=M`;
  //     console.log("API Request URL:", url);
  //     return url;
  //   } else {
  //     return null; // or handle the case when location or latitude/longitude is null
  //   }
  // };
  useEffect(() => {
    const savedCity = localStorage.getItem("weatherAppCity");
    if (savedCity) {
      setCity(savedCity);
      setSearchedCity(savedCity);
      const selectedCity = cities.find(
        (c) => c.name.toLowerCase() === savedCity.toLowerCase()
      );

      if (selectedCity) {
        console.log("Selected City:", selectedCity);
        setLocation({
          latitude: selectedCity.lat,
          longitude: selectedCity.lng,
        });
      }
    } else {
      setLocation(null); // Set location to null when no saved city is available
    }
  }, []);

  useEffect(() => {
    if (!location.latitude && !location.longitude) {
      const selectedCity = cities.find(
        (c) => c.name.toLowerCase() === city.toLowerCase()
      );
      if (selectedCity) {
        console.log("Selected City:", selectedCity);
        setLocation({
          latitude: selectedCity.lat,
          longitude: selectedCity.lng,
        });
      }
    } else {
      localStorage.setItem("weatherAppCity", city);
    }
  }, [location, city]);

  const handleCitySearch = () => {
    const selectedCity = cities.find(
      (c) => c.name.toLowerCase() === city.toLowerCase()
    );
    if (selectedCity) {
      console.log("Selected City:", selectedCity);
      setLocation({ latitude: selectedCity.lat, longitude: selectedCity.lng });
      setSearchedCity(selectedCity.name);
    }
  };

  const MAX_SUGGESTIONS = 5;

  const handleSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const matchedCities =
      inputLength === 0
        ? []
        : cities.filter((c) => c.name.toLowerCase().includes(inputValue));
    const limitedSuggestions = matchedCities.slice(0, MAX_SUGGESTIONS);
    setSuggestions(limitedSuggestions);
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = (event, { newValue }) => {
    setCity(newValue);
  };

  const renderSuggestion = (suggestion) => (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        width: "167px",
        listStyleType: "none",
      }}
    >
      {suggestion.name}
    </div>
  );

  const getSuggestionValue = (suggestion) => suggestion.name;
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleCitySearch();
    }
  };
  const inputProps = {
    placeholder: "Enter city name",
    value: city,
    onChange: handleChange,
    onKeyPress: handleKeyPress,
  };

  return (
    <div style={{ width: "75%" }}>
      <h1>Weather</h1>

      {location.latitude !== null && location.longitude !== null ? (
        <ReactWeather
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="en"
          locationLabel={searchedCity}
          unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
          showForecast
        />
      ) : null}

      <div>
        <Autosuggest
          style={{ backgroundColor: "white" }}
          suggestions={suggestions}
          onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={handleSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
      <div style={{ width: "10px" }}>
        <button onClick={handleCitySearch}>Search</button>
      </div>
    </div>
  );
};

export default Weather;
