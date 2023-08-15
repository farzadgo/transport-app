import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Departure from '../components/Departure'
import { convertIsoTime } from '../utilities/helpers'
import * as Icon from 'react-icons/md'
import * as style from '../styles/routes/Details.module.css'


const Details = ({ stops, addStop }) => {
	// for @reach/router you just need to pass "id" as prop
	const { id } = useParams()
	const [data, setData] = useState('')
	const [stop, setStop] = useState({ stopId: '', stopName: '' })
	const [today, setToday] = useState('')
	const iconProps = { color: '#F08080', size: 28 }
	const [saved, setSaved] = useState(false)

	const handleAdd = () => {
		addStop(stop)
	}

	// console.log(saved)

	useEffect(() => {
		// console.log(stops)
		if (stops.filter(e => e.stopId === stop.stopId).length !== 0) {
			// console.log('it is saved')
			setSaved(true)
		} else {
			setSaved(false)
		}
	}, [stop, stops])

	useEffect(() => {
		if (data.length) {
			let name = data[0].stop.name
			setStop({
				...stop,
				stopId: id,
				stopName: name
			})
			let date = convertIsoTime(data[0].when).date
			setToday(date)
			// console.log(data)
		}
	}, [data])

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(
				`https://v6.vbb.transport.rest/stops/${id}/departures?stopovers=true`,
			)
			setData(result.data.departures)
		}
		fetchData()
		// console.log(data.departures);
		console.log('DETAILS did mount')
		return () => console.log('DETAILS unmounted')
	}, [])


	return (
		<div className={style.details}>
			{
				data.length ?
				<div>
					<h2> {stop.stopName} | {today} </h2>
					<button
						className={style.bookmark}
						onClick={handleAdd} >
							{ saved ?
								<Icon.MdFavorite {...iconProps} /> :
								<Icon.MdFavoriteBorder {...iconProps} />
							}
					</button>
					{ data.map((item, i) => <Departure key={i} info={item} />) }
				</div> :
				<Loader />
			}
		</div>
	);
}

export default Details