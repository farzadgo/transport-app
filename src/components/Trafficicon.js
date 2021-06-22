import * as Icon from 'react-icons/md'


const TrafficIcon = ({ tag }) => {
  const iconProps = { color: '#2A2726', size: 28 }

	let name;
	switch (tag) {
		case 'bus':
			name = 'MdDirectionsBus';
			break;
		case 'tram':
			name = 'MdTram';
			break;
		case 'subway':
			name = 'MdSubway';
			break;
		case 'suburban':
			name = 'MdDirectionsRailway';
			break;
		case 'ferry':
			name = 'MdDirectionsBoat';
			break;
		case 'express':
			name = 'MdDirectionsRailway';
			break;
		case 'regional':
			name = 'MdTrain';
			break;
		default:
	}

  const TagName = Icon[name]

  return (
    <li>
			<div> <TagName {...iconProps}/> </div>
			<p> {tag} </p>
    </li>
  )
}

export default TrafficIcon