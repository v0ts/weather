<<<<<<< Updated upstream
<<<<<<< Updated upstream
import React from 'react';

export function Weather() {
  return (
    <></>
=======
=======
>>>>>>> Stashed changes
import { useState } from "react";
import { Container } from "../Container/Container";
import { WeatherDetails } from "./WeatherDetails";
import { WeatherItem } from "./WeatherItem";
import styles from "./Weather.module.scss";

export function Weather({ weatherData, deleteCard, refreshCard }) {
  const [showDetails, setShowDetails] = useState(null);
  const [activeTabs, setActiveTabs] = useState({});
  
  const regionName = new Intl.DisplayNames("en-US", { type: "region" });
  const dayNameFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  });

  const handleShowDetails = (id) => {
    setShowDetails(showDetails === id ? null : id);
  };

  const handleTabChange = (id, tab) => {
    setActiveTabs(prev => ({
      ...prev,
      [id]: tab
    }));
  };

  const formatWeatherData = (weather) => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const dayDate = date.getDate();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const day = dayNameFormatter.format(date);

    return {
      city: weather.current.name,
      country: regionName.of(weather.current.sys.country),
      temp: Math.round(weather.current.main.temp),
      hours,
      minutes,
      dayDate,
      month,
      year,
      day,
      iconSrc: `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`,
      hourly: weather.hourly,
      daily: weather.daily,
      current: weather.current
    };
  };

  if (!weatherData || !Array.isArray(weatherData)) {
    return null;
  }

  const selectedWeather = showDetails !== null ? weatherData.find(w => w.id === showDetails || w.id === parseInt(showDetails)) : null;
  const selectedActiveTab = selectedWeather ? (activeTabs[selectedWeather.id] || 'hourly') : 'hourly';

  return (
    <section className={styles.weather}>
      <Container>
        <ul className={styles.list}>
          {weatherData.map((weather, index) => (
            <WeatherItem
              key={weather.id || index}
              id={weather.id || index}
              data={formatWeatherData(weather)}
              deleteCard={deleteCard}
              refreshCard={refreshCard}
              onShowDetails={handleShowDetails}
              onTabChange={(tab) => handleTabChange(weather.id || index, tab)}
            />
          ))}
        </ul>

        {showDetails !== null && selectedWeather && (
          <WeatherDetails 
            weatherData={selectedWeather}
            activeTab={selectedActiveTab}
            onClose={() => setShowDetails(null)}
          />
        )}
      </Container>
    </section>
>>>>>>> Stashed changes
  );
};