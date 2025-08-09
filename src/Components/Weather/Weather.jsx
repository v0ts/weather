import { Container } from "../Container/Container";
import styles from "./Weather.module.scss";

import refreshIcon from "./img/refresh.svg";
import heartIcon from "./img/heart.svg";
import deleteIcon from "./img/delete.svg";

export function Weather({ weatherData }) {
  const regionName = new Intl.DisplayNames("en-US", { type: "region" });
  const dayNameFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  });

  const city = weatherData.name;
  const country = regionName.of(weatherData.sys.country);
  const temp = Math.round(weatherData.main.temp);

  const date = new Date();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const dayDate = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = dayNameFormatter.format(date);

  const icon = weatherData.weather[0].icon;
  const iconSrc = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <section className={styles.weather}>
      <Container>
        <ul>
          <li className={styles.item}>
            <div className={styles.textFlex}>
              <p className={styles.text}>{city}</p>
              <p className={styles.text}>{country}</p>
            </div>

            <p className={styles.time}>
              {hours}:{minutes}
            </p>

            <ul className={styles.buttonsList}>
              <li>
                <button className={styles.button}>Hourly forecast</button>
              </li>
              <li>
                <button className={styles.button}>Weekly forecast</button>
              </li>
            </ul>

            <div className={styles.dateFlex}>
              <p className={styles.text}>
                {dayDate}.{month}.{year}
              </p>
              <div className={styles.separator}></div>
              <p className={styles.text}>{day}</p>
            </div>

            <img src={iconSrc} alt="weather icon" className={styles.img} />

            <h2 className={styles.temp}>{temp}℃</h2>

            <div className={styles.iconsFlex}>
              <svg className={styles.icon}>
                <use
                  className={styles.iconMobile}
                  href={refreshIcon}
                  width="24"
                  height="24"
                ></use>
                <use
                  className={styles.iconDesktop}
                  href={refreshIcon}
                  width="30"
                  height="30"
                ></use>
              </svg>
              <svg className={styles.icon}>
                <use
                  className={styles.iconMobile}
                  href={heartIcon}
                  width="24"
                  height="24"
                ></use>
                <use
                  className={styles.iconDesktop}
                  href={heartIcon}
                  width="30"
                  height="30"
                ></use>
              </svg>
              <button className={styles.button}>See more</button>
              <svg className={styles.icon}>
                <use
                  className={styles.iconMobile}
                  href={deleteIcon}
                  width="24"
                  height="24"
                ></use>
                <use
                  className={styles.iconDesktop}
                  href={deleteIcon}
                  width="30"
                  height="30"
                ></use>
              </svg>
            </div>
          </li>
        </ul>
      </Container>
    </section>
  );
}
