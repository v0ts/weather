import React, { useContext, useEffect, useState } from 'react'
import style from './Header.module.scss'
import { Container } from '../Container/Container.jsx'
import logo from './img/logo.png'
import profileIcon from './img/profilePicture.png'
import closeIcon from './img/close.png'
import menuIcon from './img/mobMenu.png'
import { HeaderContext } from './HeaderContext.jsx'

export function Header() {
	const { isLogged, setIsLogged } = useContext(HeaderContext)

	const [isModalOpen, setIsModalOpen] = useState(false)

	const [signUpCheck, setSignUpCheck] = useState('Sign Up')
	const [signIn, setSignIn] = useState(true)
	const [logIn, setLogIn] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const originalPlaceholders = {
		username: 'Username',
		email: 'Email',
		password: 'Password',
		repeatPassword: 'Repeat password',
	}

	useEffect(() => {
		const menus = document.getElementsByClassName(style.mobileMenu)

		for (let i = 0; i < menus.length; i++) {
			if (isMenuOpen) {
				menus[i].classList.remove(style.isHidden)
			} else {
				menus[i].classList.add(style.isHidden)
			}
		}
	}, [isMenuOpen])

	useEffect(() => {
		if (signUpCheck === 'Sign Up') {
			setSignIn(true)
			setLogIn(false)
		} else if (signUpCheck === 'Log In') {
			setSignIn(false)
			setLogIn(true)
		}
	}, [signUpCheck])

	const logInClick = () => {
		setSignUpCheck('Log In')
	}

	const signInClick = () => {
		setSignUpCheck('Sign Up')
	}

	const signupHandle = e => {
		e.preventDefault()

		const form = e.currentTarget

		const username = form.username.value.trim()
		const email = form.email.value.trim()
		const password = form.password.value.trim()
		const repeatPassword = form.repeatPassword.value.trim()

		const allUsers = JSON.parse(localStorage.getItem('users')) || []

		Object.keys(originalPlaceholders).forEach(key => {
			const field = form.elements[key]
			if (field) {
				field.classList.remove(style.wrong)
				field.placeholder = originalPlaceholders[key]
			}
		})

		let error = false

		if (allUsers) {
			if (allUsers.find(user => user.username === username)) {
				form.username.classList.add(style.wrong)
				form.username.placeholder = 'This username is already taken'
				form.username.value = ''
				error = true
			}

			if (allUsers.find(user => user.email === email)) {
				form.email.classList.add(style.wrong)
				form.email.placeholder = 'This email is already taken'
				form.email.value = ''
				error = true
			}
		}
		if (password.length < 8) {
			form.password.classList.add(style.wrong)
			form.password.placeholder = 'Password must be at least 8 characters long'
			form.password.value = ''
			error = true
		}
		if (password !== repeatPassword) {
			form.repeatPassword.classList.add(style.wrong)
			form.repeatPassword.placeholder = 'Passwords do not match'
			form.repeatPassword.value = ''
			error = true
		}
		if (!email.includes('@') || !email.includes('.')) {
			form.email.classList.add(style.wrong)
			form.email.placeholder = 'Incorrect E-Mail format'
			form.email.value = ''
			error = true
		}
		if (!username) {
			form.username.classList.add(style.wrong)
			form.username.placeholder = 'Username is required field'
			form.username.value = ''
			error = true
		}
		if (!email) {
			form.email.classList.add(style.wrong)
			form.email.placeholder = 'E-Mail is required field'
			form.email.value = ''
			error = true
		}
		if (!password) {
			form.password.classList.add(style.wrong)
			form.password.placeholder = 'Password is required field'
			form.password.value = ''
			error = true
		}
		if (!repeatPassword) {
			form.repeatPassword.classList.add(style.wrong)
			form.repeatPassword.placeholder = 'Repeat Password is required field'
			form.repeatPassword.value = ''
			error = true
		}

		if (error) return

		const userObject = { username, email, password }

		allUsers.push(userObject)

		localStorage.setItem('users', JSON.stringify(allUsers))
		localStorage.setItem('savedData', JSON.stringify(userObject))

		setIsModalOpen(false)
		setIsLogged(true)
	}

	const loginHandle = e => {
		e.preventDefault()

		const form = e.currentTarget

		const username = form.username.value.trim()
		const password = form.password.value.trim()

		const allUsers = JSON.parse(localStorage.getItem('users')) || []

		Object.keys(originalPlaceholders).forEach(key => {
			const field = form.elements[key]
			if (field) {
				field.classList.remove(style.wrong)
				field.placeholder = originalPlaceholders[key]
			}
		})

		let error = false

		if (!allUsers) {
			form.username.classList.add(style.wrong)
			form.username.placeholder = 'This username is not registered yet'
			form.username.value = ''
			return
		}
		if (!allUsers.find(user => user.username === username)) {
			form.username.classList.add(style.wrong)
			form.username.placeholder = 'This username is not registered yet'
			form.username.value = ''
			error = true
		}
		if (allUsers.find(user => user.username === username)) {
			const userPassword = allUsers.find(
				user => user.username === username
			).password

			if (userPassword !== password) {
				form.password.classList.add(style.wrong)
				form.password.placeholder = 'Password does not match'
				form.password.value = ''
				error = true
			}
		}
		if (!username) {
			form.username.classList.add(style.wrong)
			form.username.placeholder = 'Username is required field'
			form.username.value = ''
			error = true
		}
		if (!password) {
			form.password.classList.add(style.wrong)
			form.password.placeholder = 'Password is required field'
			form.password.value = ''
			error = true
		}

		if (error) return

		setIsModalOpen(false)
		setIsLogged(true)
	}

	const mobileMenuClickHandle = () => {
		if (isMenuOpen) {
			setIsMenuOpen(false)
		} else {
			setIsMenuOpen(true)
		}

		const menuIcons = document.getElementsByClassName(style.imageMobile)
		for (let i = 0; i < menuIcons.length; i++) {
			menuIcons[i].classList.toggle(style.transformed)
		}
	}

	return (
		<>
			<header className={style.header}>
				<Container>
					<div className={style.box}>
						<nav className={style.nav}>
							<img className={style.logo} src={logo} alt='Weather Logo' />
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
							{isLogged ? (
								<button
									type='button'
									className={style.button}
									onClick={() => setIsLogged(false)}
								>
									Log out
								</button>
							) : (
								<button
									type='button'
									className={style.button}
									onClick={() => setIsModalOpen(true)}
								>
									{signUpCheck}
								</button>
							)}
							<img
								src={profileIcon}
								alt='Profile Picture'
								className={style.profile}
							/>
						</div>

						<nav className={style.navMobile}>
							<img className={style.logoMobile} src={logo} alt='Weather Logo' />
							<button
								type='button'
								className={style.buttonMobile}
								onClick={mobileMenuClickHandle}
							>
								{'Menu'}
								<img className={style.imageMobile} src={menuIcon} alt='Menu' />
							</button>
						</nav>

						<div className={`${style.shownMobile} ${style.mobileMenu}`}>
							<ul className={style.mobileList}>
								<li className={style.mobileItem}>
									<a href='' className={style.mobileLink}>
										Who we are
									</a>
								</li>
								<li className={style.mobileItem}>
									<a href='' className={style.mobileLink}>
										Contacts
									</a>
								</li>
								<li className={style.mobileItem}>
									<a href='' className={style.mobileLink}>
										Menu
									</a>
								</li>
							</ul>
							<div className={style.mobileSignup}>
								<img src={profileIcon} alt='' className={style.mobileImage} />
								{isLogged ? (
									<button
										type='button'
										className={style.button}
										onClick={() => setIsLogged(false)}
									>
										Log out
									</button>
								) : (
									<button
										type='button'
										className={style.button}
										onClick={() => setIsModalOpen(true)}
									>
										{signUpCheck}
									</button>
								)}
							</div>
						</div>
					</div>
				</Container>
			</header>

			{isModalOpen ? (
				signIn ? (
					<div className={style.backdrop} onClick={() => setIsModalOpen(false)}>
						<div className={style.modal} onClick={e => e.stopPropagation()}>
							<button
								className={`${style.modalClose} ${style.hiddenPC}`}
								onClick={() => setIsModalOpen(false)}
							>
								<img
									className={style.modalCloseIcon}
									src={closeIcon}
									alt='Close'
								/>
							</button>
							<h3 className={style.modalTitle}>Sign Up</h3>
							<form className={style.modalForm} onSubmit={signupHandle}>
								<ul className={style.modalList}>
									<li className={style.modalItem}>
										<label htmlFor='username' className={style.modalLabel}>
											Username
										</label>
										<input
											type='text'
											name='username'
											placeholder='Username'
											className={style.modalInput}
										/>
									</li>
									<li className={style.modalItem}>
										<label htmlFor='email' className={style.modalLabel}>
											E-Mail
										</label>
										<input
											type='text'
											name='email'
											placeholder='E-Mail'
											className={style.modalInput}
										/>
									</li>
									<li className={style.modalItem}>
										<label htmlFor='password' className={style.modalLabel}>
											Password
										</label>
										<input
											type='password'
											name='password'
											placeholder='Password'
											className={style.modalInput}
										/>
									</li>
									<li className={style.modalItem}>
										<label
											htmlFor='repeatPassword'
											className={style.modalLabel}
										>
											Repeat Password
										</label>
										<input
											type='password'
											name='repeatPassword'
											placeholder='Repeat Password'
											className={style.modalInput}
										/>
									</li>
								</ul>
								<button className={style.modalButton} type='submit'>
									Sign Up
								</button>
							</form>
							<p className={style.modalFooter}>
								Already have an account?{' '}
								<span
									className={style.modalLink}
									onClick={() => {
										logInClick()
									}}
								>
									Log In
								</span>
							</p>
						</div>
					</div>
				) : logIn ? (
					<div className={style.backdrop} onClick={() => setIsModalOpen(false)}>
						<div className={style.modal} onClick={e => e.stopPropagation()}>
							<button
								className={`${style.modalClose} ${style.hiddenPC}`}
								onClick={() => setIsModalOpen(false)}
							>
								<img
									className={style.modalCloseIcon}
									src={closeIcon}
									alt='Close'
								/>
							</button>
							<h3 className={style.modalTitle}>Log In</h3>
							<form className={style.modalForm} onSubmit={loginHandle}>
								<ul className={style.modalList}>
									<li className={style.modalItem}>
										<label htmlFor='username' className={style.modalLabel}>
											Username
										</label>
										<input
											type='text'
											name='username'
											placeholder='Username'
											className={style.modalInput}
											defaultValue={
												JSON.parse(localStorage.getItem('savedData'))
													?.username || ''
											}
										/>
									</li>
									<li className={style.modalItem}>
										<label htmlFor='password' className={style.modalLabel}>
											Password
										</label>
										<input
											type='password'
											name='password'
											placeholder='Password'
											className={style.modalInput}
											defaultValue={
												JSON.parse(localStorage.getItem('savedData'))
													?.password || ''
											}
										/>
									</li>
								</ul>
								<button className={style.modalButton} type='submit'>
									Log In
								</button>
							</form>
							<p className={style.modalFooter}>
								Don't Have an Account?{' '}
								<span
									className={style.modalLink}
									onClick={() => {
										signInClick()
									}}
								>
									Sign Up
								</span>
							</p>
						</div>
					</div>
				) : null
			) : null}
		</>
	)
}
