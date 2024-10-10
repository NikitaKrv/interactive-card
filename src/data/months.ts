import { Option } from '../types/option.ts'

export const months: {
	label: string, options: Option[]
} = {
	label: 'month', options: Array.from({length: 12}, (_, i) => {
		const month = i + 1
		if (month < 10) {
			return {value: month, label: `0${ month }`}
		}
		return {value: month, label: month.toString()}
	})
}
