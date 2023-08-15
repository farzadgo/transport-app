import { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
// import { navigate } from '@reach/router'
import Loader from '../components/Loader'
import TrafficIcon from '../components/Trafficicon'
import * as Icon from 'react-icons/md'
import * as style from '../styles/routes/Home.module.css'


const Home = () => {

	const [query, setQuery] = useState('')
	const [data, setData] = useState('')
	const [loading, setLoading] = useState(false)
	const iconProps = { color: '#2A2726', size: 28 }

	const handleChange = event => {
		setQuery(event.target.value)
	}

  const handleSubmit = event => {
    event.preventDefault()
		if (query) {
			setLoading(true)
			fetchData(query)
		}
  }

	const fetchData = async () => {
		const result = await axios(
			`https://v6.vbb.transport.rest/locations?query=${query}&results=5&addresses=false&poi=false`,
		)
		setData(result.data);
		setLoading(false)
	}
	// console.log(data)
	// console.log(query)

	useEffect(() => {
		console.log('HOME did mount')
		return () => console.log('HOME unmounted')
	}, [])

	return (
		<div className={style.home} >
			<h2 className={style.title}> Search for stations </h2>

			<form className={style.search} onSubmit={handleSubmit} >
				<input type="text" name="search" onChange={handleChange} />
				<button type="submit"><Icon.MdSearch {...iconProps}/></button>
			</form>

			<div>
				{ loading ?
					<Loader /> :
					<ul>
						{ data && data.map(item => (
							<StopThumb key={item.id} info={item} />
						))}
					</ul>
				}
			</div>
		</div>
	)
}

export default Home



const StopThumb = ({ info }) => {

	const history = useHistory()
	const { id, name, products } = info
	const iconProps = { color: '#2A2726', size: 32 }

	const keys = Object.keys(products)
	const filtered = keys.filter(key => products[key])

	const handleClick = () => {
		history.push(`/details/${id}`)
		// navigate(`/details/${id}`)
	}

	return (
		<div className={style.card} onClick={handleClick}>

			<div className={style.info}>
				<h3> {name} </h3>
				<ul>
					{ filtered.map((item, i) => <TrafficIcon key={i} tag={item} />) }
				</ul>
			</div>

			<div className={style.arrow}>
        <Icon.MdChevronRight {...iconProps}/>
      </div>

		</div>
	)
}