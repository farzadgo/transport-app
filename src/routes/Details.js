import { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Departure from '../components/Departure'
import { convertIsoTime } from '../utilities/helpers'
import * as Icon from 'react-icons/md'
import * as style from '../styles/routes/Details.module.css'


const Details = ({ id, addStop }) => {

	const [data, setData] = useState('')
	const [stop, setStop] = useState({ stopId: '', stopName: ''})
	const [today, setToday] = useState('')
	const iconProps = { color: '#F08080', size: 28 }

	const handleAdd = () => {
		addStop(stop)
	}

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
				`https://v5.vbb.transport.rest/stops/${id}/departures?stopovers=true`,
			)
			setData(result.data)
		}
		fetchData()
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
							<Icon.MdFavorite {...iconProps} />
					</button>
					{ data.map(item => <Departure info={item} />) }
				</div> :
				<Loader />
			}
		</div>
	);
}

export default Details