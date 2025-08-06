import { Container } from "../Container/Container";

export function Weather({ weatherData }) {
  const regionName = new Intl.DisplayNames("en-US", { type: "region" });
  const dayNameFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  });

  const city = weatherData.name;
  const country = regionName.of(weatherData.sys.country);
  const temp = Math.round(weatherData.main.temp);

  const date = new Date();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const dayDate = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = dayNameFormatter.format(date);

  return (
    <section>
      <Container>
        <div className="">
          <p>{city}</p>
          <p>{country}</p>

          <p>
            {hours}:{minutes}
          </p>

          <ul>
            <li>
              <button>Hourly forecast</button>
            </li>
            <li>
              <button>Weekly forecast</button>
            </li>
          </ul>

          <p>
            {dayDate}.{month}.{year}
          </p>
          <p>{day}</p>

          <h2>{temp}℃</h2>

          <button>See more</button>
        </div>
      </Container>
    </section>
  );
}
