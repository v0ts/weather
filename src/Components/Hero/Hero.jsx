import { useState } from "react";
import styles from "./Hero.module.scss";
import { Container } from "../Container/Container";

import searchIcon from "./img/search.svg";

export function Hero({ setKeyword }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const inputValue = form.elements.city.value;

    if (inputValue) {
      setKeyword(inputValue);

      form.reset();
    }
  };

  const now = new Date();

  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();
  const day = now.toLocaleString("en-US", { weekday: "long" });
  const date = now.getDate();

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <Container>
          <h1 className={styles.title}>Weather dashboard</h1>

          <div className={styles.flex}>
            <h2 className={styles.subtitle}>
              Create your personal list of favorite cities and always be aware
              of the weather.
            </h2>
            <div className={styles.separator}></div>
            <h2 className={styles.date}>
              {month} {year} {day}, {date}th
            </h2>
          </div>

          <form className={styles.inputBox} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search location"
              className={styles.input}
              name="city"
            />
            <button className={styles.search}>
              <svg className={styles.icon}>
                <use href={searchIcon}></use>
              </svg>
            </button>
          </form>
        </Container>
      </div>
    </section>
  );
}
