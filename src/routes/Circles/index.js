import React from 'react';
import './index.css'
import useDimensions from '../../lib/useDims'
const Circles = () => {
	
	const dims = useDimensions()
	console.log('dims')
	console.log(dims)
	
	return(
		<React.Fragment>
			<h2>Circles</h2>
			<div id="circlesBox"></div>
		</React.Fragment>
	)
}

export default Circles;