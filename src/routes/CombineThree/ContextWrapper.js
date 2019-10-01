import React from 'react';
import CombineThree from './'

import {TextAreaProvider} from '../../Contexts/TextArea'
import {CommonWordsProvider} from '../../Contexts/CommonWords'

/*
	Add more providers per UI selectable element...
		words-by-size etc.
*/

const Wrapped = () => {
	console.log('%c WRAPPER', 'background-color: steelblue; color: white;')
	return (
		<TextAreaProvider>
			<CommonWordsProvider>
				<CombineThree />
			</CommonWordsProvider>
		</TextAreaProvider>
	)
}

export default Wrapped