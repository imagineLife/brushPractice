import React from 'react';
import CombineTwo from './'

import {TextAreaProvider} from '../../Contexts/TextArea'

/*
	Add more providers per UI selectable element...
		words-by-size etc.
*/

const Wrapped = () => {
	console.log('%c WRAPPER', 'background-color: steelblue; color: white;')
	return (
		<TextAreaProvider>
				<CombineTwo />
		</TextAreaProvider>
	)
}

export default Wrapped