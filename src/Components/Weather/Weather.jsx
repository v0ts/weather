import React, { useState } from 'react'
import { Container } from '../Container/Container'
import { WeatherDetails } from './WeatherDetails'
import { WeatherItem } from './WeatherItem'
import styles from './Weather.module.scss'
import { getWeather } from '../../services/get-weather'

export function Weather({
    weatherData,
    setWeatherData,
    deleteCard,
    refreshCard,
}) {
    const [showDetails, setShowDetails] = useState(null)
    const [activeTabs, setActiveTabs] = useState({})
    const [detailsById, setDetailsById] = useState({})
    const [loadingId, setLoadingId] = useState(null)

	const regionName = new Intl.DisplayNames('en-US', { type: 'region' })
	const dayNameFormatter = new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
	})

    const handleShowDetails = async (id, city) => {
        if (showDetails === id) {
            setShowDetails(null)
            return
        }

        if (!detailsById[id]) {
            setLoadingId(id)
            try {
                const full = await getWeather(city)
                if (full && full.current) {
                    setDetailsById(prev => ({ ...prev, [id]: full }))
                }
            } catch (_) {
            } finally {
                setLoadingId(null)
            }
        }
        setShowDetails(id)
    }

    const handleTabChange = (id, tab) => {
        setActiveTabs(prev => ({
            ...prev,
            [id]: tab,
        }))
    }

	const formatWeatherData = weather => {
		const date = new Date()
		const hours = date.getHours().toString().padStart(2, '0')
		const minutes = date.getMinutes().toString().padStart(2, '0')
		const dayDate = date.getDate()
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const year = date.getFullYear()
		const day = dayNameFormatter.format(date)

		return {
			city: weather.current.name,
			country: regionName.of(weather.current.sys.country),
			temp: Math.round(weather.current.main.temp),
			hours,
			minutes,
			dayDate,
			month,
			year,
			day,
			iconSrc: `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`,
			hourly: weather.hourly,
			daily: weather.daily,
			current: weather.current,
		}
	}

	if (!weatherData || !Array.isArray(weatherData)) {
		return null
	}

    const selectedWeather =
        showDetails !== null
            ? weatherData.find(
                    w => w.id === showDetails || w.id === parseInt(showDetails)
              )
            : null
    const selectedActiveTab = selectedWeather
        ? activeTabs[selectedWeather.id] || 'hourly'
        : 'hourly'
    const selectedDetails =
        showDetails !== null ? detailsById[showDetails] : null

	return (
		<section className={styles.weather}>
			<Container>
                <ul className={styles.wrapper}>
					{weatherData?.map(weather => {
						const regionName = new Intl.DisplayNames('en-US', {
							type: 'region',
						})
						const dayNameFormatter = new Intl.DateTimeFormat('en-US', {
							weekday: 'long',
						})

						const city = weather.name
						const country = regionName.of(weather.sys.country)
						const temp = Math.round(weather.main.temp)

						const date = new Date()

						const hours = date.getHours().toString().padStart(2, '0')
						const minutes = date.getMinutes().toString().padStart(2, '0')

						const dayDate = date.getDate()
						const month = date.getMonth()
						const year = date.getFullYear()
						const day = dayNameFormatter.format(date)

						const icon = weather.weather[0].icon
						const iconSrc = `https://openweathermap.org/img/wn/${icon}@4x.png`

						const id = weather.id

						let isFav = weather.isFav

                        return (
							<WeatherItem
								key={id}
								id={id}
								deleteCard={deleteCard}
								refreshCard={refreshCard}
								isFav={isFav}
								weatherData={weatherData}
								setWeatherData={setWeatherData}
								currWeather={weather}
                                onShowDetails={() => handleShowDetails(id, city)}
                                onTabChange={(tab) => handleTabChange(id, tab)}
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
						)
					})}
				</ul>

                {loadingId && selectedWeather && selectedWeather.id === loadingId && (
                    <div className={styles.noData}><p>Loading details...</p></div>
                )}
                {selectedWeather && selectedDetails && !loadingId && (
                    <WeatherDetails
                        weatherData={selectedDetails}
                        activeTab={selectedActiveTab}
                        onClose={() => setShowDetails(null)}
                    />
                )}
			</Container>
		</section>
	)
}
