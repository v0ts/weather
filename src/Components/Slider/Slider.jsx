import React, { useState } from 'react'
import style from './Slider.module.scss'

import { Container } from '../Container/Container.jsx'
import img1 from './img/Rectangle10.png'
import img2 from './img/Rectangle11.png'
import img3 from './img/Rectangle12.png'
import img4 from './img/Rectangle13.png'
import img5 from './img/Rectangle14.png'

export function Slider() {
	const images = [img1, img2, img3, img4, img5]
	const [currentIndex, setCurrentIndex] = useState(2)

	const handlePrev = () => {
		setCurrentIndex(prevIndex =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		)
	}

	const handleNext = () => {
		setCurrentIndex(prevIndex =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		)
	}

	const handleImageClick = index => {
		setCurrentIndex(index)
	}

	const getImageClass = index => {
		const total = images.length
		const diff = (index - currentIndex + total) % total

		if (diff === 0) return 'center'
		if (diff === 1) return 'right'
		if (diff === 2) return 'right2'
		if (diff === total - 1) return 'left'
		if (diff === total - 2) return 'left2'
		return 'hidden'
	}

	return (
		<section className={style.slider}>
			<Container>
				<div className={style.sliderContainer}>
					<h1 className={style.titstyl}>Beautiful nature</h1>
					<ul className={style.sliderList}>
						{images.map((image, index) => (
							<li
								key={index}
								className={`${style.sliderImage} ${
									style[getImageClass(index)]
								}`}
								onClick={() => handleImageClick(index)}
							>
								<img src={image} alt={`Slide ${index}`} />
							</li>
						))}
					</ul>
				</div>
			</Container>
		</section>
	)
}
