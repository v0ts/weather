import React from 'react'
import style from './Header.module.scss'
import { Container } from '../Container/Container.jsx'
import logo from './img/logo.png'
import profileIcon from './img/profilePicture.png'

export function Header() {
	return (
		<header className={style.header}>
			<Container>
				<div className={style.box}>
					<nav className={style.nav}>
						<img className={style.logo} src={logo} alt='Logo' />
						<ul className={style.list}>
							<li className={style.item}>
								<a className={style.link} href=''>
									Who we are
								</a>
							</li>
							<li className={style.item}>
								<a className={style.link} href=''>
									Contacts
								</a>
							</li>
							<li className={style.item}>
								<a className={style.link} href=''>
									Menu
								</a>
							</li>
						</ul>
					</nav>

					<div className={style.signup}>
						<button type='button' className={style.button}>
							Sign up
						</button>
						<img
							src={profileIcon}
							alt='Profile Picture'
							className={style.profile}
						/>
					</div>
				</div>
			</Container>
		</header>
	)
}
