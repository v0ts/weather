import React from 'react';
import styles from './WeatherDetails.module.scss';

export function WeatherDetails({ weatherData }) {
  const {
    current: {
      main: { feels_like, temp_min, temp_max, humidity, pressure },
      wind: { speed },
      visibility
    },
    hourly,
    daily
  } = weatherData;

  const weatherMetrics = [
    {
      label: 'Feels like',
      value: `${Math.round(feels_like)}°C`,
      icon: '🌡️'
    },
    {
      label: 'Min °C / Max °C',
      value: `${Math.round(temp_min)}°C / ${Math.round(temp_max)}°C`,
      icon: '📊'
    },
    {
      label: 'Humidity',
      value: `${humidity}%`,
      icon: '🌧️'
    },
    {
      label: 'Pressure',
      value: `${pressure} Pa`,
      icon: '📈'
    },
    {
      label: 'Wind speed',
      value: `${speed} m/s`,
      icon: '💨'
    },
    {
      label: 'Visibility',
      value: visibility >= 10000 ? 'Unlimited' : `${visibility}m`,
      icon: '👁️'
    }
  ];

  const chartData = hourly ? hourly.map((hour, index) => ({
    time: hour.time,
    temp: hour.temp,
    x: 50 + index * 50,
    y: 200 - (hour.temp + 5) * 4
  })) : [];

  const createPath = () => {
    if (chartData.length === 0) return '';
    let path = `M ${chartData[0].x} ${chartData[0].y}`;
    for (let i = 1; i < chartData.length; i++) {
      path += ` L ${chartData[i].x} ${chartData[i].y}`;
    }
    return path;
  };

  const formatForecastDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  return (
    <div className={styles.weatherDetails}>
      <div className={styles.metricsGrid}>
        {weatherMetrics.map((metric, index) => (
          <div key={index} className={styles.metricCard}>
            <div className={styles.metricIcon}>{metric.icon}</div>
            <div className={styles.metricInfo}>
              <h4 className={styles.metricLabel}>{metric.label}</h4>
              <p className={styles.metricValue}>{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.forecastSection}>
        <h3 className={styles.forecastTitle}>Hourly forecast</h3>
        <div className={styles.hourlyChart}>
          <svg width="100%" height="200" className={styles.chart}>
            {[5, 10, 15, 20, 25].map(temp => (
              <line
                key={temp}
                x1="50"
                y1={200 - (temp + 5) * 4}
                x2="100%"
                y2={200 - (temp + 5) * 4}
                stroke="#e9ecef"
                strokeWidth="1"
              />
            ))}
            {[5, 10, 15, 20, 25].map(temp => (
              <text
                key={temp}
                x="10"
                y={200 - (temp + 5) * 4 + 5}
                fontSize="12"
                fill="#6c757d"
              >
                {temp}°C
              </text>
            ))}
            <path
              d={createPath()}
              stroke="#ff6b35"
              strokeWidth="3"
              fill="none"
            />
            {chartData.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#ff6b35"
              />
            ))}
          </svg>
          <div className={styles.timeLabels}>
            {hourly && hourly.slice(0, 8).map((hour, index) => (
              <span key={index} className={styles.timeLabel}>
                {hour.time.getHours()}:00
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className={styles.forecastSection}>
        <h3 className={styles.forecastTitle}>8-day forecast</h3>
        <div className={styles.weeklyForecast}>
          {daily && daily.map((day, index) => (
            <div key={index} className={styles.dailyItem}>
              <div className={styles.dailyLeft}>
                <span className={styles.dailyDate}>
                  {formatForecastDate(day.date)}
                </span>
              </div>
              <div className={styles.dailyCenter}>
                <img 
                  src={`http://openweathermap.org/img/wn/${day.icon}.png`}
                  alt={day.weather}
                  className={styles.weatherIcon}
                />
                <span className={styles.dailyTemp}>{day.temp}°C</span>
              </div>
              <div className={styles.dailyRight}>
                <span className={styles.dailyWeather}>{day.weather}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}