import React from 'react'
import WordList from '../../components/WordList/UsingContext'
import TextDisplay from '../../components/TextDisplay/UsingContext'
const Combined = () => {
	
	return(
		<React.Fragment>
			<WordList />
			<TextDisplay />
		</React.Fragment>
	)
}

export default Combined