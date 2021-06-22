import { useEffect, useState } from 'react'
import { navigate } from '@reach/router'
import * as Icon from 'react-icons/md'
import * as style from '../styles/routes/Stations.module.css'


const Stations = ({ stops, delStop }) => {

	const [stations, setStations] = useState('') 

	useEffect(() => {
		if (stops.length) {
			setStations(stops)
		}
    console.log('STATION did mount')
		return () => console.log('STATION unmounted')
	}, [stops]);

	return (
		<div className={style.stations}>
			<h2> Your favorite stations </h2>
			{	stations ?
				stations.map(item => <StationThumb info={item} delStop={delStop} />) :
				<div> No Favorite Stations </div>
			}
		</div>
	);
}

export default Stations


const StationThumb = ({ info, delStop }) => {
	const { stopId, stopName } = info

	const handleDelete = e => {
		e.preventDefault()
		// updateState(stopId)
		// update state inside app > delStop
		delStop(stopId)
	}

	const handleClick = e => {
		e.preventDefault()
		navigate(`/details/${stopId}`)
	}

	return (
		<div className={style.stationthumb} >
			<h3> {stopName} </h3>
			
			<button onClick={handleDelete} >
				<Icon.MdDelete {...{ color: '#FF4500', size: 28 }} />
			</button>

			<button onClick={handleClick} >
				<Icon.MdChevronRight {...{ color: '#292929', size: 28 }} />
			</button>
		</div>
	)
}