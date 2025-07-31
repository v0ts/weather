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
}

export default App
