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
      const onlyFavs = localStorageData.filter(weather => weather.isFav);

      setWeatherData(onlyFavs);
    }
  }, []);

  useEffect(() => {
    if (keyword && keyword.trim() !== "") {
      getWeather(keyword).then((data) => {
        setWeatherData((prev) => {
          const exists = prev.some((item) => item.id === data.current.id);
          if (exists) return prev;
          if (data === null) return prev;

          return [{ ...data.current, isFav: false }, ...prev];
        });
      });
    }
  }, [keyword]);

  useEffect(() => {
    if (weatherData.length > 0) {
      localStorage.setItem("weatherData", []);
      localStorage.setItem("weatherData", JSON.stringify(weatherData));
    } else if (weatherData.length === 0) {
      localStorage.removeItem("weatherData");
    }
  }, [weatherData]);

  const deleteCard = (id) => {
    const newWeatherData = weatherData.filter((weather) => weather.id !== id);
    setWeatherData(newWeatherData);
  };

  const refreshCard = (id, keyword, isFav) => {
    let index = null;

    for (let i = 0; i < weatherData.length; i++) {
      if (weatherData[i].id === id) {
        index = i;
        break;
      }
    }

    getWeather(keyword).then((data) => {
      const weatherDataCopy = [...weatherData];
      weatherDataCopy[index] = { ...data.current, isFav };

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
              setWeatherData={setWeatherData}
              deleteCard={deleteCard}
              refreshCard={refreshCard}
            ></Weather>
          ) : null}
          {/* <News></News> */}
          <Slider></Slider>
        </main>
        <Footer />
      </HeaderProvider>
    </>
  );
}

export default App;
