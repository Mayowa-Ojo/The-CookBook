const dailyRecipeIds = [
  { day: 1, idMeal: '52772' },
  { day: 2, idMeal: '52840' },
  { day: 3, idMeal: '52787' },
  { day: 4, idMeal: '52854' },
  { day: 5, idMeal: '52948' },
  { day: 6, idMeal: '52941' },
  { day: 7, idMeal: '52878' },
  { day: 8, idMeal: '52957' },
  { day: 9, idMeal: '52953' },
  { day: 10, idMeal: '52948' },
  { day: 11, idMeal: '52797' },
  { day: 12, idMeal: '52904' },
  { day: 13, idMeal: '52962' },
  { day: 14, idMeal: '52962' },
  { day: 15, idMeal: '52897' },
  { day: 16, idMeal: '52979' },
  { day: 17, idMeal: '52770' },
  { day: 18, idMeal: '52892' },
  { day: 19, idMeal: '52787' },
  { day: 20, idMeal: '52922' },
  { day: 21, idMeal: '52814' },
  { day: 22, idMeal: '52770' },
  { day: 23, idMeal: '52813' },
  { day: 24, idMeal: '52846' },
  { day: 25, idMeal: '52826' },
  { day: 26, idMeal: '52864' },
  { day: 27, idMeal: '52795' },
  { day: 28, idMeal: '52871' },
  { day: 29, idMeal: '52914' },
  { day: 30, idMeal: '52899' },
  { day: 31, idMeal: '52902' },
];

function getDailyRecipeId(dailyRecipeIds) {
  const currentDay = parseInt(new Date().toLocaleDateString().split('/')[1])
  // find idMeal for current day
  return dailyRecipeIds.find(obj => obj.day == currentDay)
}

function extractProps(arr) {
	let arrCopy = JSON.parse(JSON.stringify(arr))
	let extractedMeal = []
	
	arrCopy.map(obj => {
		let objCopy = {...obj}
		let ingredients = []
		let measures = []

		const firstExtraction = (obj) => {		
			for(let prop in obj) {
				if(prop.includes("strIngredient")) {
					delete obj[prop]
				} else if(prop.includes("strMeasure")) {
					delete obj[prop]
				}
			}
		}
		
		const secondExtraction = (objCopy) => {		
			for(let prop in objCopy) {
				if(prop.includes("strIngredient")) {
					if(objCopy[prop] !== null && objCopy[prop].length > 0) {
						ingredients.push(objCopy[prop])
					}
				} else if(prop.includes("strMeasure")) {
					if(objCopy[prop] !== null && objCopy[prop].length > 0) {
						measures.push(objCopy[prop])
					}
				}
			}
		}
		
		const assign = () => {
			obj.ingredients = ingredients;
			obj.measures = measures;
		}

		firstExtraction(obj);
		secondExtraction(objCopy);
		assign(obj);
		
		extractedMeal.push(obj);
	})
	return extractedMeal;
}

function toSet(arr) {
    let set = new Set();
	arr.map(val => set.add(val))
	let filteredArr = Array.from(set)
	return filteredArr
}

export { dailyRecipeIds, getDailyRecipeId, extractProps, toSet }