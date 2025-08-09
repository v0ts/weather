import styles from "./Weather.module.scss";

import refreshIcon from "./img/refresh.svg";
import heartIcon from "./img/heart.svg";
import deleteIcon from "./img/delete.svg";

export function WeatherItem({data}) {
  // console.log(props);
  return (
    <li className={styles.item}>
      <div className={styles.textFlex}>
        <p className={styles.text}>{data.city}</p>
        <p className={styles.text}>{data.country}</p>
      </div>

      <p className={styles.time}>
        {data.hours}:{data.minutes}
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
          {data.dayDate}.{data.month}.{data.year}
        </p>
        <div className={styles.separator}></div>
        <p className={styles.text}>{data.day}</p>
      </div>

      <img src={data.iconSrc} alt="weather icon" className={styles.img} />

      <h2 className={styles.temp}>{data.temp}℃</h2>

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
  );
}
