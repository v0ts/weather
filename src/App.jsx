import 'normalize.css'
import { useEffect, useState } from 'react'
import { getWeather } from './services/get-weather'

import { Footer } from './Components/Footer/Footer'
import { Header } from './Components/Header/Header'
import { HeaderProvider } from './Components/Header/HeaderContext'
import { Hero } from './Components/Hero/Hero'
import { News } from './Components/News/News'
import { Slider } from './Components/Slider/Slider'
import { Weather } from './Components/Weather/Weather'

function App() {
	const [keyword, setKeyword] = useState(null)
	const [weatherData, setWeatherData] = useState(null)

	useEffect(() => {
		if (keyword) {
			getWeather(keyword).then(data => setWeatherData(data))
		}
	}, [keyword])

	useEffect(() => {
		if (weatherData && weatherData.length) {
			localStorage.setItem('weatherData', JSON.stringify(weatherData))
		}
	}, [weatherData])

	const deleteCard = id => {
		const newWeatherData = weatherData.filter(weather => weather.id !== id)
		setWeatherData(newWeatherData)
	}

	const refreshCard = (id, keyword) => {
		let index = null

		for (let i = 0; i < weatherData.length; i++) {
			if (weatherData[i].id === id) {
				index = i
				break
			}
		}

		getWeather(keyword).then(data => {
			const weatherDataCopy = [...weatherData]
			weatherDataCopy[index] = data

			setWeatherData(weatherDataCopy)
		})
	}

	return (
		<>
			<HeaderProvider>
				<Header />
				<main>
					<Hero setKeyword={setKeyword}></Hero>
					{weatherData ? <Weather weatherData={weatherData}></Weather> : null}
					<News></News>
					<Slider></Slider>
				</main>
				<Footer />
			</HeaderProvider>
		</>
	)
}

export default App
