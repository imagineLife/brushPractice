import React from 'react'
import * as scale from 'd3-scale'
import * as d3Arr from 'd3-array'
import * as d3Shape from 'd3-shape'
import * as d3Select from 'd3-selection'
import * as brush from 'd3-brush'
import TextDisplay from '../../components/TextDisplay/UsingComplexContext'
// import SelectableArea from '../../components/SelectableArea/complexContext'
import SelectableArea from '../../components/SelectableArea/d3Works'
import CommonWords from '../../components/WordList/UsingContext'
// import './index.css'

const CombineTwo = () => {

	const moved = (d) => {
		console.log('MOVED');
	}

	return(
		<React.Fragment>
			<SelectableArea 
				dims={{
					width: '700px',
					height: '100px'
				}}
				onMove={moved}
			/>
			<CommonWords />
			<TextDisplay />
		</React.Fragment>
	)
}

export default CombineTwo