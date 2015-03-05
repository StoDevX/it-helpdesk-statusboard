import {reduce} from 'lodash'

export default function calculateFontWeight(count) {
	var fontWeight = [
		{min:  0,  max:  0,       weight: 'w100'},
		{min:  1,  max:  5,       weight: 'w200'},
		{min:  6,  max: 10,       weight: 'w300'},
		{min: 11,  max: 15,       weight: 'w400'},
		{min: 16,  max: 20,       weight: 'w500'},
		{min: 21,  max: 25,       weight: 'w600'},
		{min: 26,  max: 30,       weight: 'w700'},
		{min: 31,  max: 35,       weight: 'w800'},
		{min: 36,  max: Infinity, weight: 'w900'},
	]

	var result = reduce(fontWeight, (resultString, weightClass) => {
		if (count >= weightClass.min && count <= weightClass.max) {
			resultString += ' ' + weightClass.weight;
		}
		return resultString
	}, '')

	return result
}
