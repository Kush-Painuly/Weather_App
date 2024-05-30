import React, { useState } from "react";
import styles from "./css/weather.module.css";

import axios from "axios";
import {
  WiCloudy,
  WiCloudyGusts,
  WiRain,
  WiDaySunny,
  WiSnow,
  WiThunderstorm,
  WiTornado,
} from "weather-icons-react";
const Weather = () => {
  const [location, setLocation] = useState("");
  const [request, setRequest] = useState({});

  const Api_Key = "1592a48331702e9ad00493ce34b0349f";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${Api_Key}&units=metric`;

  const searchWeather = () => {
    axios
      .get(URL)
      .then((req) => {
        setRequest(req.data);
        console.log(req.data);
      })
      .catch((err) => console.log(err.message));
    setLocation("");
  };

  const getWeatherIcon = (weatherDescription, size = 26) => {
    switch (weatherDescription) {
      case "clear sky":
        return <WiDaySunny size={size} color="yellow" />;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return <WiCloudy size={size} color="gray" />;
      case "overcast clouds":
        return <WiCloudyGusts size={size} color="darkgray" />;
      case "shower rain":
      case "rain":
      case "light rain":
      case "moderate rain":
      case "heavy intensity rain":
        return <WiRain size={size} color="Blue" />;
      case "thunderstorm":
        return <WiThunderstorm size={size} color="black" />;
      case "snow":
        return <WiSnow size={size} color="white" />;
      case "mist":
      case "smoke":
      case "haze":
      case "sand, dust whirls":
      case "fog":
      case "sand":
      case "dust":
      case "volcanic ash":
      case "squalls":
      case "tornado":
        return <WiTornado size={size} color="grey" />;
      default:
        return null;
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div>
        <div className={styles.innerDiv}>
          <div className={styles.InputBox}>
            <input
              type="text"
              placeholder="Enter your City..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.userInput}
            />
          </div>
          <div className={styles.search_btn}>
            <button className={styles.search} onClick={searchWeather}>
              Search
            </button>
          </div>
          <div className={styles.resultDiv}>
            <h1 className={styles.responseHead}>{request.name}, IN</h1>
            <p className={styles.weatherday}>{currentDate}</p>
            <p className={styles.innerPara}>
              {request.main ? <span>{request.main.temp} &deg;C</span> : null}
            </p>
            <p className={styles.innerWeatherDets}>
              {request.weather ? (
                <span>
                  {getWeatherIcon(request.weather[0].main, 30)}
                  <span>{request.weather[0].main}</span>
                </span>
              ) : null}
            </p>
            <div className={styles.innerDets}>
              <p className={styles.temp_dets}>
                {request.main ? (
                  <span>{request.main.temp_max} &deg;C /</span>
                ) : null}
              </p>
              <p className={styles.temp_dets}>
                {request.main ? (
                  <span>{request.main.temp_min} &deg;C</span>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
