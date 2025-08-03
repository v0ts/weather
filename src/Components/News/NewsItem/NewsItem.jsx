import style from '../News.module.scss'

export const NewsItem = ({ url, title }) => {
	return (
		<li className={style.item}>
			<img src={url} alt='' className={style.image} />
			<p className={style.newsTitle}>{title}</p>
		</li>
	)
}
