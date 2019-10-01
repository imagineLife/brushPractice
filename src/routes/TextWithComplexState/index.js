import React from 'react'
import WordList from '../../components/WordList'
import TextDisplay from '../../components/TextDisplay/UsingComplexContext'
import { TextProvider } from '../../TextContext/complex'
const TextAndSelection = () => {
	
	return(
		<React.Fragment>
			<h2>Text with Complex State</h2>

			<TextProvider>
				<TextDisplay />
			</TextProvider>
		</React.Fragment>
	)
}

export default TextAndSelection