import { Container } from "../Container/Container";

export function Hero() {
  return (
    <section>
      <Container>
        <h1>Weather dashboard</h1>

        <h2>Create your personal list of favorite cities and always be aware of the weather.</h2>
        <h2>October 2023 Friday, 13th</h2>

        <div className="">
          <input type="text" placeholder="Search location" />
          <button>Search</button>
        </div>
      </Container>
    </section>
  );
}
