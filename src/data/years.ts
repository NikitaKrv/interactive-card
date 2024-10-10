import { Option } from '../types/option.ts'

const currentYear = Number(new Date().getFullYear())

export const years: {
	label: string, options: Option[]
} = {
	label: 'year', options: Array.from({length: 12}, (_, i) => {
		const year = currentYear + i
		
		return {value: year, label: year.toString()}
	})
}
