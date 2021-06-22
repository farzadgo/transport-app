import { useEffect, useState } from 'react'
import * as style from '../styles/components/Departure.module.css'
import { convertIsoTime } from '../utilities/helpers'
import TrafficIcon from '../components/Trafficicon'


const Departure = ({ info }) => {

	const [time, setTime] = useState('')
	const [bg, setBg] = useState('#ffffff')
	const [fg, setFg] = useState('#242424')
	const {
		direction,
		line,
		platform,
		when,
		nextStopovers
	} = info

	const nameStyle = {
		display: 'inline-block',
		background: bg,
		color: fg,
		padding: '1px 9px',
		border: 'none',
		borderRadius: line.symbol === 'S' || line.product !== 'tram' && line.metro ? '20px' : '0',
	}

	let firstWord = direction.split(' ')[0]
	// console.log(nextStopovers)

	useEffect(() => {
		let time = convertIsoTime(when).time
		setTime(time)
		if (line.color) {
			setBg(line.color.bg)
			setFg(line.color.fg)
		}
	}, [])


	return (
		<div className={style.departure} >

			<div className={style.type} >
				<p style={nameStyle}> {line.name} </p>
				<TrafficIcon tag={line.product} />
			</div>

			<p> Direction of <b> {direction} </b></p>
			<p> Departs at <b> {time} </b></p>
			{ platform && <p className={style.platform}> Platform <b> {platform} </b></p> }
			{ line.metro && <p className={style.metro}><i> Metro </i></p> }

			{ firstWord !== 'Ringbahn' && <p className={style.togo}> {nextStopovers.length - 1} stop to go </p> }
			{ nextStopovers &&
				nextStopovers.slice(1, 5).map(e => 
					<span className={style.nextstop}>
						{e.stop.name}
					</span>
				)
			}

		</div>
	)
}

export default Departure