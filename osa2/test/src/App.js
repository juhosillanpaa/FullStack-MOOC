import React, { useEffect } from 'react'

const App = () => {
	
	const list = [{m:"Hei"},{m:"Hey"},{m:"Hi"}]

	return ( <div> {list.map(elem => (<div key={elem.m}> {elem.m} </div>))} </div> )
	
	
}

export default App