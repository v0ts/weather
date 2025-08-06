const API_KEY = "f32891df780c5d5f8e423ea0e538be98";

export const getWeather = (keyword) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${keyword}&appid=${API_KEY}&units=metric`
  )
    .then((res) => {
      return res.json().then((data) => {
        if (!res.ok || data.cod !== 200) {
          return null;
        }

        return data;
      });
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};