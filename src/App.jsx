<<<<<<< Updated upstream
import 'normalize.css'
import { Header } from './Components/Header/Header'
import { Hero } from './Components/Hero/Hero'
import { Weather } from './Components/Weather/Weather'
import { News } from './Components/News/News'
import { Slider } from './Components/Slider/Slider'
import { Footer } from './Components/Footer/Footer'
import { HeaderProvider } from './Components/Header/HeaderContext'

function App() {
	return (
		<>
			<HeaderProvider>
				<Header />
				<main>
					<Hero></Hero>
					<Weather></Weather>
					<News></News>
					<Slider></Slider>
				</main>
				<Footer />
			</HeaderProvider>
		</>
	)
=======
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
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoords(latitude, longitude);
          if (data) {
            setWeatherData([{ ...data, id: Date.now() }]);
          }
        },
        (error) => {
          console.log("Геолокація недоступна:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (keyword) {
      getWeather(keyword).then((data) => {
        if (data) {
          const newCard = { ...data, id: Date.now() };
          setWeatherData(prev => [...prev, newCard]);
        }
      });
    }
  }, [keyword]);

  useEffect(() => {
    if (weatherData.length > 0) {
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

    if (index !== null) {
      getWeather(keyword).then((data) => {
        if (data) {
          const weatherDataCopy = [...weatherData];
          weatherDataCopy[index] = { ...data, id };
          setWeatherData(weatherDataCopy);
        }
      });
    }
  };

  return (
    <>
      <HeaderProvider>
        <Header />
        <main>
          <Hero setKeyword={setKeyword}></Hero>
          {weatherData.length > 0 && (
            <Weather 
              weatherData={weatherData}
              deleteCard={deleteCard}
              refreshCard={refreshCard}
            />
          )}
          <News></News>
          <Slider></Slider>
        </main>
        <Footer />
      </HeaderProvider>
    </>
  );
>>>>>>> Stashed changes
}

export default App
