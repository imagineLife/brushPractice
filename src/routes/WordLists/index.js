import React from 'react';
import ListBox from '../../components/ListBox'

const WordLists = () => {

	let [selectedList, setSelectedList] = React.useState(null)

	let [listData] = React.useState({
		"Common Words": ["our", "we", "the", "them"],
		"Longest Words": [
			"Administration",
			"Infrastructure",
			"Understanding",
			"Neighborhoods",
			"Redistributed",
			"Disagreements",
			"Establishment",
			"Transferring",
			"Technologies",
			"Celebration",
			"Politicians",
			"Importantly"
		],
		"Action Words": [
			"Walking",
			"Running",
			"Singing",
			"Dancing"
		]
	})

	//set initial 'chosen' list
	React.useEffect(() => {
		setSelectedList(Object.keys(listData)[0])
	}, [])
	
	return(
		<React.Fragment>
			<h2>Word Lists</h2>
			<ListBox 
				lists={listData} 
				selectedList={selectedList} 
				selectItem={(e) => setSelectedList(e.currentTarget.innerHTML)}/>
				
		</React.Fragment>
	)
}

export default WordLists;