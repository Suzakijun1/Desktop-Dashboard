import React, { useEffect } from "react";
import ReactWeather, { useWeatherBit } from "react-open-weather";

const Weather = () => {
  // const [lat, setLat] = useState(null);
  // const [lng, setLng] = useState(null);
  // const [status, setStatus] = useState(null);

  // const getLocation = () => {
  //   if (!navigator.geolocation) {
  //     setStatus('Geolocation is not supported by your browser');
  //   } else {
  //     setStatus('Locating...');
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setStatus(null);
  //       setLat(position.coords.latitude);
  //       setLng(position.coords.longitude);
  //     }, () => {
  //       setStatus('Unable to retrieve your location');
  //     });
  //   }
  // }
  const { data, isLoading, errorMessage } = useWeatherBit({
    key: "e865491682014a589731e8dfce8a4683",
    lat: "48.137154",
    lon: "11.576124",
    lang: "en",
    unit: "M", // values are (M,S,I)
  });

  return (
    <div style={{ width: "50%" }}>
      <ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel="Munich"
        unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
        showForecast
      />
    </div>
  );
};

export default Weather;
