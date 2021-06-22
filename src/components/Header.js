import { Link } from '@reach/router'
import * as style from '../styles/components/Header.module.css'


const Header = () => (
	<header className={style.header}>
		<h1> Transport App </h1>
		<nav>
			<Link className={style.active} to="/">Home</Link>
			<Link className={style.active} to="/stations/">Your Stops</Link>
		</nav>
	</header>
);

export default Header
