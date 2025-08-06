import style from './News.module.scss'
import { Container } from '../Container/Container.jsx'
import { useEffect, useState } from 'react'
import { NewsItem } from './NewsItem/NewsItem.jsx'
import { v4 as uuidv4 } from 'uuid'

export function News() {
	const apiKey = '2487e94559f54e229275610eb6395bc0'

	const [query, setQuery] = useState('Pets')
	const [pageSize, setPageSize] = useState(4)
	const [data, setData] = useState([])

	const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&pageSize=${pageSize}&language=en&sortBy=popularity`

	const fetchNews = async () => {
		try {
			const responce = await fetch(url)
			const data = await responce.json()
			setData(data.articles)
			console.log(data.articles)
		} catch (error) {
			console.error(error)
			return 'error'
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
					<ul className={style.list}>
						{data.map(item => {
							return (
								<NewsItem
									key={uuidv4()}
									url={item.urlToImage}
									title={item.title}
								/>
							)
						})}
					</ul>
					<button
						type='button'
						className={style.button}
						onClick={updatePageSize}
					>
						See more
					</button>
				</div>
			</Container>
		</section>
	)
}
