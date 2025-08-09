import { Container } from "../Container/Container";
import { WeatherItem } from "./WeatherItem";
import { v4 as uuidv4 } from "uuid";
import styles from "./Weather.module.scss";

export function Weather({ weatherData }) {
  return (
    <section className={styles.weather}>
      <Container>
        <ul className={styles.wrapper}>
          {weatherData.map((weather) => {
            console.log(weather);

            if (weather !== null) {
              const regionName = new Intl.DisplayNames("en-US", {
                type: "region",
              });
              const dayNameFormatter = new Intl.DateTimeFormat("en-US", {
                weekday: "long",
              });

              const city = weather.name;
              const country = regionName.of(weather.sys.country);
              const temp = Math.round(weather.main.temp);

              const date = new Date();

              const hours = date.getHours().toString().padStart(2, "0");
              const minutes = date.getMinutes().toString().padStart(2, "0");

              const dayDate = date.getDate();
              const month = date.getMonth();
              const year = date.getFullYear();
              const day = dayNameFormatter.format(date);

              const icon = weather.weather[0].icon;
              const iconSrc = `https://openweathermap.org/img/wn/${icon}@4x.png`;

              return (
                <WeatherItem
                  key={uuidv4()}
                  data={{
                    city,
                    country,
                    temp,
                    hours,
                    minutes,
                    dayDate,
                    month,
                    year,
                    day,
                    iconSrc,
                  }}
                />
              );
            }
          })}
        </ul>
      </Container>
    </section>
  );
}
