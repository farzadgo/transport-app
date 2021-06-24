import { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
// import { Link } from '@reach/router'
import * as style from '../styles/components/Header.module.css'


const Header = () => {
	
	const { pathname } = useLocation()
	// const history = useHistory()

	useEffect(() => {
		// const rgx = pathname.substring(0, pathname.lastIndexOf("/") + 1)
		// const rgx = pathname.split('/')[1]
	}, [pathname])
	
	return (
		<header className={style.header}>
			<h1> Transport App </h1>
			<nav>
				<Link className={style.active} to="/">Home</Link>
				<Link className={style.active} to="/stations/">Your Stops</Link>
			</nav>
		</header>
	)
}

export default Header
