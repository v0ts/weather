import "normalize.css";
import { useEffect, useState } from "react";
import { getWeather } from "./services/get-weather";

import { Header } from "./Components/Header/Header";
import { Hero } from "./Components/Hero/Hero";
import { Weather } from "./Components/Weather/Weather";
import { News } from "./Components/News/News";
import { Slider } from "./Components/Slider/Slider";
import { Footer } from "./Components/Footer/Footer";
import { HeaderProvider } from "./Components/Header/HeaderContext";

function App() {
  const [keyword, setKeyword] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem("weatherData") !== null &&
      localStorage.length !== 0
    ) {
      const localStorageData = JSON.parse(localStorage.getItem("weatherData"));
      setWeatherData(localStorageData);
    }
  }, []);

  useEffect(() => {
    if (keyword && keyword.trim() !== "") {
      getWeather(keyword).then((data) => {
        setWeatherData((prev) => {
          const exists = prev.some((item) => item.id === data.id);
          if (exists) return prev;
          return [data, ...prev];
        });
      });
    }
  }, [keyword]);

  useEffect(() => {
    if (weatherData.length) {
      localStorage.setItem("weatherData", JSON.stringify(weatherData));
    }
  }, [weatherData]);

  const deleteCard = (id) => {
    const newWeatherData = weatherData.filter((weather) => weather.id !== id);
    setWeatherData(newWeatherData);
  };

  const refreshCard = (id, keyword) => {
    let index = null;

    for (let i = 0; i < weatherData.length; i++) {
      if (weatherData[i].id === id) {
        index = i;
        break;
      }
    }

    getWeather(keyword).then((data) => {
      const weatherDataCopy = [...weatherData];
      weatherDataCopy[index] = data;

      setWeatherData(weatherDataCopy);
    });
  };

  return (
    <>
      <HeaderProvider>
        <Header />
        <main>
          <Hero setKeyword={setKeyword}></Hero>
          {weatherData.length !== 0 ? (
            <Weather
              weatherData={weatherData}
              deleteCard={deleteCard}
              refreshCard={refreshCard}
            ></Weather>
          ) : null}
          <News></News>
          <Slider></Slider>
        </main>
        <Footer />
      </HeaderProvider>
    </>
  );
}

export default App;
