import { useEffect, useState } from 'react'
import { Route, HashRouter as Router, Switch } from 'react-router-dom'
// import { Router } from '@reach/router'
import Header from './components/Header'
import Home from './routes/Home'
import Details from './routes/Details'
import Stations from './routes/Stations'

const App = () => {
	
	const [stops, setStops] = useState([])

	const addStop = (stop) => {
    // console.log(stop, stops)
    let exists = stops.filter(e => e.stopId === stop.stopId)
    if (exists.length === 0) {
      // console.log('not exist')
      let newInput = [...stops, stop]
      // IMPORTANT
      setStops(newInput)
      let inputString = JSON.stringify(newInput)
      localStorage.setItem('stops', inputString)
    } else {
      // console.log('exists')
      delStop(stop.stopId)
    }
	}

	const delStop = (id) => {
		let newStops = stops.filter(e => e.stopId !== id)
		// IMPORTANT
		setStops(newStops)
		let stopString = JSON.stringify(newStops)
		localStorage.setItem('stops', stopString)
	}

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

		// return () => { }
	}, [])


	return (
    <Router>
      <div id="app">
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route >
          <Route path="/details/:id" exact>
            <Details stops={stops} addStop={addStop} /> 
          </Route>
          <Route path="/stations/" exact>
            <Stations stops={stops} delStop={delStop} />
          </Route>
        </Switch>
      </div>
    </Router>
	)
}

export default App