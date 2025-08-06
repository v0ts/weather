import { useEffect, useState, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Container } from '../Container/Container.jsx'
import style from './News.module.scss'
import { NewsItem } from './NewsItem/NewsItem.jsx'

export function News() {
	const apiKey = 'fd2392a3d1113acb4d9f4ed228f37229' 

	const [query, setQuery] = useState('pets')
	const [pageSize, setPageSize] = useState(4)
	const [data, setData] = useState([]);
	const memoizedData = useMemo(() => data, [data]);
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&country=us&max=${pageSize}&apikey=${apiKey}`

	const fetchNews = async () => {
		try {
			setLoading(true)
			setError(null)
			const response = await fetch(url)

			const result = await response.json()

			if (result.articles && Array.isArray(result.articles)) {
				setData(result.articles)
			} else {
				setData([])
				console.error('No articles found in response:', result)
			}
		} catch (error) {
			console.error('Error fetching news:', error)
			setError(error.message)
			setData([])
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchNews()
	}, [])

	useEffect(() => {
		fetchNews()
	}, [pageSize, query])

	const updatePageSize = () => {
		setPageSize(prev => prev + 4)
	}

	return (
		<section className={style.news}>
			<Container>
				<div className={style.box}>
					<h2 className={style.title}>Interacting with our pets</h2>
					{loading && <p>Loading news...</p>}
					{error && <p>Error loading news: {error}</p>}
					{!loading && !error && memoizedData && memoizedData.length > 0 && (
						<ul className={style.list}>
							{memoizedData.map(item => {
								return (
									<NewsItem
										key={uuidv4()}
										url={item.image}
										title={item.title}
									/>
								)
							})}
						</ul>
					)}
					{!loading && !error && memoizedData && memoizedData.length === 0 && (
						<p>No news articles found.</p>
					)}
					<button
						type='button'
						className={style.button}
						onClick={updatePageSize}
						disabled={loading}
					>
						See more
					</button>
				</div>
			</Container>
		</section>
	)
}
