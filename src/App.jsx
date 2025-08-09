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
    if (keyword) {
      getWeather(keyword).then((data) => {
        setWeatherData((prev) => [data, ...prev]);
      });
    }
  }, [keyword]);

  return (
    <>
      <HeaderProvider>
        <Header />
        <main>
          <Hero setKeyword={setKeyword}></Hero>
          {weatherData.length !== 0 ? (
            <Weather weatherData={weatherData}></Weather>
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
