import React from 'react'
import * as scale from 'd3-scale'
import * as d3Arr from 'd3-array'
import * as d3Shape from 'd3-shape'
import * as d3Select from 'd3-selection'
import * as brush from 'd3-brush'
import SelectableArea from '../../components/SelectableArea'
import './index.css'

const SelectableAreaRoute = () => {
	
	const moved = (d) => {
		console.log('%c MOVED!!', 'background-color: darkblue; color: white;')
		console.log('d')
		console.log(d)	
	}

	//Area Data
	let [areaData, setAreaData] = React.useState(null)

	/*
		load area data
	*/
	React.useEffect(() => {
		fetch('../../data/areaData.json')
			.then(res => res.json())
			.then(setAreaData)
	}, [])

	if(!areaData){
		return <p>loading area data...</p>
	}

	return(
		<SelectableArea 
			dims={{
				width: '700px',
				height: '100px'
			}}
			data={areaData}
			onMove={moved}
		/>
	)
}

export default SelectableAreaRoute