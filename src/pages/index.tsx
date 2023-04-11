// Import required dependencies
import React, { useState } from "react";
import styles from './index.module.css';

type WeatherData = {
  cod: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
};

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<boolean | null>(null);

  const handleSearch = () => {
    const APIKey = "68a0f1d0a679cb6b2a5c068b0ea07bc8";
    if (city === "") return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "404") {
          setError(true);
          setWeatherData(null);
        } else {
          setError(false);
          setWeatherData(data);
        }
      });
  };

  const description = weatherData?.weather?.[0]?.description ?? "N/A";

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <i className="fa-solid fa-location-dot"></i>
        <input
          type="text"
          placeholder="Enter your location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="fa-solid fa-magnifying-glass"
          onClick={handleSearch}
        ></button>
      </div>

      {error && (
        <div className={styles.notFound}>
          <img src="images/not-found.png" />
          <p>Oops! Invalid location :/</p>
        </div>
      )}

      {weatherData && (
        <div className={styles.weatherBox}>
          <img src="" />
          <p className={styles.temperature}>{`${weatherData.main.temp}°C`}</p>
          <p className={styles.description}>{description}</p>
        </div>
      )}

      {weatherData && (
        <div className={styles.weatherDetails}>
          <div className={styles.humidity}>
            <i className="fa-solid fa-water"></i>
            <div className={styles.text}>
              <span>{`${weatherData.main.humidity}%`}</span>
              <p>Humidity</p>
            </div>
          </div>
          <div className={styles.wind}>
            <i className="fa-solid fa-wind"></i>
            <div className={styles.text}>
              <span>{`${weatherData.wind.speed} Km/h`}</span>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default WeatherApp;
