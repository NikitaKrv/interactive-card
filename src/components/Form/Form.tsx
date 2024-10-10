import Select, { SingleValue, Theme } from 'react-select'
import { ChangeEvent } from 'react'
import { months } from '../../data/months.ts'
import { years } from '../../data/years.ts'
import { Option } from '../../types/option.ts'
import styles from './Form.module.scss'

interface FormProps {
	name: string,
	number: string,
	month: string,
	year: string,
	cvc: string,
	setName: (text: string) => void,
	setNumber: (text: string) => void,
	setMonth: (text: string) => void,
	setYear: (text: string) => void,
	setCvc: (text: string) => void,
	setFocusElemName: (name: string) => void
	setBlurElem: () => void
}

const Form = (
	{
		name, number, month, year, cvc, setName,
		setNumber, setMonth, setYear, setCvc,
		setFocusElemName, setBlurElem
	}: FormProps) => {
	const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		
		switch (e.target.name) {
			case 'name':
				return setName(value)
			case 'number':
				const numberValue = value.replace(/\D/g, '')
				if (numberValue.length <= 16) {
					return numberValue === ''
						? setNumber(numberValue)
						: setNumber(numberValue.match(/[0-9]{1,4}/g)!.join(' '))
				}
				break
			case 'year':
				return setYear(value)
			case 'cvc':
				const cvcValue = value.replace(/\D/g, '')
				if (cvcValue.length <= 3) return setCvc(cvcValue)
				break
		}
	}
	
	const handleSetMonth = (selectedMonth: SingleValue<Option>) => {
		setMonth(selectedMonth!.label)
	}
	
	const handleSetYear = (selectedYear: SingleValue<Option>) => {
		setYear(selectedYear!.label)
	}
	
	return (
		<div className={ styles.cardForm }>
			<form className={ styles.form } onSubmit={ e => e.preventDefault() }>
				<label htmlFor="name" className={ styles.formItem }>
					cardholder name
					<input
						placeholder="e.g. Jane Appleseed"
						id="name"
						type="text"
						name="name"
						value={ name }
						onChange={ handleSetValue }
						onFocus={ () => setFocusElemName('name') }
						onBlur={ setBlurElem }
					/>
				</label>
				<label htmlFor="number" className={ styles.formItem }>
					card number
					<input
						placeholder="e.g. 1234 5678 9123 0000"
						type="text"
						id="number"
						name="number"
						value={ number }
						onChange={ handleSetValue }
						onFocus={ () => setFocusElemName('number') }
						onBlur={ setBlurElem }
					/>
				</label>
				<div className={ styles.row }>
					<div className={ ` ${ styles.formItem } ${ styles.date }` }>
						<label htmlFor="month">exp. date (mm/yy)</label>
						<div>
							<Select
								options={ [months] }
								placeholder="MM"
								inputId="month"
								value={ months.options.find(item => item.label === month) }
								onChange={ handleSetMonth }
								className={ styles.select }
								theme={ (theme: Theme) => ({
									...theme,
									borderRadius: 7,
								}) }
								onFocus={ () => setFocusElemName('month') }
								onBlur={ setBlurElem }
								styles={
									{
										control: (base, state) => (
											{
												...base,
												boxShadow: 'none',
												borderWidth: '2px',
												borderColor: state.isFocused ? '#8A9385' : '#DEDFDD',
												'*': {
													borderColor: '#8A9385 !important',
												},
											}
										),
										indicatorSeparator: () => ({display: 'none'}),
									}
								}
								classNames={ {
									control: () => styles.selectValue,
								} }
								isSearchable={ false }
							/>
							<Select
								options={ [years] }
								placeholder="YY"
								value={ years.options.find(item => item.label === year) }
								onChange={ handleSetYear }
								inputId="year"
								className={ styles.select }
								theme={ (theme: Theme) => ({
									...theme,
									borderRadius: 7,
								}) }
								onFocus={ () => setFocusElemName('month') }
								onBlur={ setBlurElem }
								styles={
									{
										control: (base, state) => (
											{
												...base,
												boxShadow: 'none',
												borderWidth: '2px',
												borderColor: state.isFocused ? '#8A9385' : '#DEDFDD',
												'*': {
													borderColor: '#8A9385 !important',
												},
											}
										),
										indicatorSeparator: () => ({display: 'none'}),
									}
								}
								classNames={ {
									control: () => styles.selectValue,
								} }
								isSearchable={ false }
							/>
						</div>
					</div>
					<label
						htmlFor="cvc"
						className={ ` ${ styles.formItem } ${ styles.cvc }` }
					>
						cvc
						<input
							placeholder="e.g. 123"
							type="text"
							name="cvc"
							id="cvc"
							value={ cvc }
							onChange={ handleSetValue }
							onFocus={ () => setFocusElemName('cvc') }
							onBlur={ setBlurElem }
						/>
					</label>
				</div>
				<button className={ styles.btn }>confirm</button>
			</form>
		</div>
	)
}

export default Form