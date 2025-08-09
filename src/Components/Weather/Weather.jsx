import { useState } from "react";
import { Container } from "../Container/Container";
import { WeatherDetails } from "./WeatherDetails";

export function Weather({ weatherData }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('hourly');
  
  const regionName = new Intl.DisplayNames("en-US", { type: "region" });
  const dayNameFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  });

  const {
    current: {
      name: city,
      sys: { country },
      main: { temp },
    }
  } = weatherData;

  const countryName = regionName.of(country);
  const temperature = Math.round(temp);

  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const dayDate = date.getDate();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const day = dayNameFormatter.format(date);

  const handleSeeMore = () => {
    setShowDetails(!showDetails);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleRefresh = () => {};

  const handleDelete = () => {};

  return (
    <section>
      <Container>
        <div>
          <div>
            <div>
              <h2>{city}</h2>
              <p>{countryName}</p>
            </div>
            <div>
              {hours}:{minutes}
            </div>
          </div>

          <div>
            <button 
              className={activeTab === 'hourly' ? 'active' : ''}
              onClick={() => setActiveTab('hourly')}
            >
              Hourly forecast
            </button>
            <button 
              className={activeTab === 'weekly' ? 'active' : ''}
              onClick={() => setActiveTab('weekly')}
            >
              Weekly forecast
            </button>
          </div>

          <div>
            {dayDate}.{month}.{year}
          </div>
          <div>{day}</div>

          <div>{temperature}°C</div>

          <div>
            <button onClick={handleRefresh}>
              ↻
            </button>
            <button 
              className={isFavorite ? 'active' : ''}
              onClick={handleFavorite}
            >
              ♥
            </button>
            <button onClick={handleDelete}>
              🗑
            </button>
            <button onClick={handleSeeMore}>
              See more
            </button>
          </div>
        </div>
        
        {showDetails && (
          <WeatherDetails weatherData={weatherData} />
        )}
      </Container>
    </section>
  );
}