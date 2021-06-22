import { useEffect, useState } from 'react'
import { Router } from '@reach/router'
import Header from './components/Header'
import Home from './routes/Home'
import Details from './routes/Details'
import Stations from './routes/Stations'

const App = () => {
	
	const [stops, setStops] = useState([])

	const addStop = (stop) => {
		let newInput = [...stops, stop]
		// IMPORTANT
		setStops(newInput)
		let inputString = JSON.stringify(newInput)
		localStorage.setItem('stops', inputString)
	}

	const delStop = (id) => {
		let newStops = stops.filter(e => e.stopId !== id)
		// IMPORTANT
		setStops(newStops)
		let stopString = JSON.stringify(newStops)
		localStorage.setItem('stops', stopString)
	}

	// console.log(stops)

	useEffect(() => {
		const getStops = () => {
			let store = localStorage.getItem('stops')
			if (store) {
				// console.log(store)
				// JSON.parse(store)
				setStops(JSON.parse(store))
			}
		}
		getStops()

		// return () => {
		// }
	}, [])

	return (
		<div id="app">
			<Header />
			<Router>
				<Home path="/" />
				<Details path="/details/:id" addStop={addStop} />
				<Stations path="/stations/" stops={stops} delStop={delStop} />
			</Router>
		</div>
	)
}

export default App