import { useState } from 'react'
import Card from '../Card/Card.tsx'
import Form from '../Form/Form.tsx'
import styles from './App.module.scss'

const App = () => {
	const [name, setName] = useState('')
	const [number, setNumber] = useState('')
	const [month, setMonth] = useState('')
	const [year, setYear] = useState('')
	const [cvc, setCvc] = useState('')
	const [
		currentFocusedElemName, setCurrentFocusedElemName
	] = useState<null | string>(null)
	
	const handleFocusElem = (name: string) => {
		setCurrentFocusedElemName(name)
	}
	
	const handleBlurElem = () => {
		setCurrentFocusedElemName(null)
	}
	
	return (
		<main className={ styles.app }>
			<Card
				name={ name }
				number={ number }
				month={ month }
				year={ year }
				cvc={ cvc }
				currentFocusElemName={ currentFocusedElemName }
			/>
			<Form
				name={ name }
				number={ number }
				month={ month }
				year={ year }
				cvc={ cvc }
				setName={ setName }
				setNumber={ setNumber }
				setMonth={ setMonth }
				setYear={ setYear }
				setCvc={ setCvc }
				setFocusElemName={ handleFocusElem }
				setBlurElem={ handleBlurElem }
			/>
		</main>
	)
}

export default App