
const API_KEY = "f32891df780c5d5f8e423ea0e538be98";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeather = async (keyword) => {
  try {
    const res = await fetch(
      `${BASE_URL}/weather?q=${keyword}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    // console.log(data);
    
    if (data.cod === "404") {
      return null;
    }

    const hourlyData = await getHourlyForecast(data.coord.lat, data.coord.lon);
    const dailyData = await getDailyForecast(data.coord.lat, data.coord.lon);

    return {
      current: data,
      hourly: hourlyData,
      daily: dailyData
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const res = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    
    if (!res.ok || data.cod !== 200) {
      return null;
    }

    const hourlyData = await getHourlyForecast(lat, lon);
    const dailyData = await getDailyForecast(lat, lon);

    return {
      current: data,
      hourly: hourlyData,
      daily: dailyData
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getHourlyForecast = async (lat, lon) => {
  try {
    const res = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    
    if (!res.ok || data.cod !== "200") {
      return null;
    }

    return data.list.slice(0, 24).map(item => ({
      time: new Date(item.dt * 1000),
      temp: Math.round(item.main.temp),
      weather: item.weather[0].main,
      icon: item.weather[0].icon
    }));
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getDailyForecast = async (lat, lon) => {
  try {
    const res = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    
    if (!res.ok || data.cod !== "200") {
      return null;
    }

    const dailyData = data.list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000);
      const day = date.getDate();
      
      if (!acc[day] && date.getHours() >= 12 && date.getHours() < 15) {
        acc[day] = {
          date: date,
          temp: Math.round(item.main.temp),
          weather: item.weather[0].main,
          icon: item.weather[0].icon
        };
      }
      
      return acc;
    }, {});

    return Object.values(dailyData).slice(0, 8);
  } catch (err) {
    console.log(err);
    return null;
  }
};

