import "normalize.css";
import { useEffect, useState } from "react";
import { getWeather, getWeatherByCoords } from "./services/get-weather";

import { Header } from "./Components/Header/Header";
import { Hero } from "./Components/Hero/Hero";
import { Weather } from "./Components/Weather/Weather";
import { News } from "./Components/News/News";
import { Slider } from "./Components/Slider/Slider";
import { Footer } from "./Components/Footer/Footer";

function App() {
  const [keyword, setKeyword] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = localStorage.getItem("weatherData");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            const onlyFavs = parsed.filter((w) => w && w.isFav);
            if (onlyFavs.length > 0) {
              setWeatherData(onlyFavs);
              return;
            }
          }
        }
      } catch (e) {
        localStorage.removeItem("weatherData");
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const data = await getWeatherByCoords(latitude, longitude);
              if (data && data.current) {
                setWeatherData([{ ...data.current, isFav: false }]);
                return;
              }
            } catch (_) {}
            const def = await getWeather("Kyiv");
            if (def && def.current) {
              setWeatherData([{ ...def.current, isFav: false }]);
            }
          },
          async () => {
            const def = await getWeather("Kyiv");
            if (def && def.current) {
              setWeatherData([{ ...def.current, isFav: false }]);
            }
          }
        );
      } else {
        const def = await getWeather("Kyiv");
        if (def && def.current) {
          setWeatherData([{ ...def.current, isFav: false }]);
        }
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (keyword && keyword.trim() !== "") {
      getWeather(keyword).then((data) => {
        setWeatherData((prev) => {
          if (data === null) {
            return [...prev];
          }
          const exists = prev.some((item) => item.id === data.current.id);
          if (exists) return [...prev];

          return [{ ...data.current, isFav: false }, ...prev];
        });
      });
    }
  }, [keyword]);

  useEffect(() => {
    if (Array.isArray(weatherData) && weatherData.length > 0) {
      localStorage.setItem("weatherData", JSON.stringify(weatherData));
    } else {
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
      <Header />
      <main>
          <Hero onSearch={setKeyword}></Hero>
          {weatherData.length > 0 ? (
            <Weather
              weatherData={weatherData}
              setWeatherData={setWeatherData}
              deleteCard={deleteCard}
              refreshCard={refreshCard}
            ></Weather>
          ) : null}
          <News></News>
          <Slider></Slider>
      </main>
      <Footer />
    </>
  );
}

export default App;