import "normalize.css";
import { useEffect, useState } from "react";
import { getWeather, getWeatherByCoords } from "./services/get-weather";

import { Header } from "./Components/Header/Header";
import { Hero } from "./Components/Hero/Hero";
import { Weather } from "./Components/Weather/Weather";
import { News } from "./Components/News/News";
import { Slider } from "./Components/Slider/Slider";
import { Footer } from "./Components/Footer/Footer";
import { HeaderProvider } from "./Components/Header/HeaderContext";

function App() {
  const [keyword, setKeyword] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await getWeatherByCoords(latitude, longitude);
            if (data) {
              setWeatherData(data);
            }
          } catch (error) {
            console.error("Error fetching weather by coords:", error);
          }
          setIsLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (keyword) {
      setIsLoading(true);
      getWeather(keyword)
        .then((data) => {
          if (data) {
            setWeatherData(data);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [keyword]);

  return (
    <>
      <HeaderProvider>
        <Header />
        <main>
          <Hero setKeyword={setKeyword}></Hero>
          {isLoading ? (
            <div>Loading weather data...</div>
          ) : (
            weatherData && <Weather weatherData={weatherData}></Weather>
          )}
          <News></News>
          <Slider></Slider>
        </main>
        <Footer />
      </HeaderProvider>
    </>
  );
}

export default App;