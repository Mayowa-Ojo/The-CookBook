const sample = {
	meals: [
		{
			idMeal: "52861",
			strMeal: "Peanut Butter Cheesecake",
			strDrinkAlternate: null,
			strCategory: "Desert",
			strArea: "American",
			strInstructions:
				"Oil and line a 20cm round loose- bottomed cake tin with cling film, making it as smooth as possible. Melt the butter in a pan. Crush the biscuits by bashing them in a bag with a rolling pin, then stir them into the butter until very well coated. Press the mixture firmly into the base of the tin and chill.\r\nSoak the gelatine in water while you make the filling. Tip the ricotta into a bowl, then beat in the peanut butter and syrup. Ricotta has a slightly grainy texture so blitz until smooth with a stick blender for a smoother texture if you prefer.\r\nTake the soaked gelatine from the water and squeeze dry. Put it into a pan with the milk and heat very gently until the gelatine dissolves. Beat into the peanut mixture, then tip onto the biscuit base. Chill until set.\r\nTo freeze, leave in the tin and as soon as it is solid, cover the surface with cling film, then wrap the tin with cling film and foil.\r\nTo defrost, thaw in the fridge overnight.\r\nTo serve, carefully remove from the tin. Whisk the cream with the sugar until it holds its shape, then spread on top of the cheesecake and scatter with the peanut brittle.",
			strMealThumb:
				"https://www.themealdb.com/images/media/meals/qtuuys1511387068.jpg",
			strTags: "Cake,Desert,Treat,UnHealthy,Speciality",
			strYoutube: "https://www.youtube.com/watch?v=QSTsturcyL0",
			strIngredient1: "Butter",
			strIngredient2: "Peanut Cookies",
			strIngredient3: "Gelatine Leafs",
			strIngredient4: "Ricotta",
			strIngredient5: "Peanut Butter",
			strIngredient6: "Golden Syrup",
			strIngredient7: "Milk",
			strIngredient8: "Double Cream",
			strIngredient9: "Light Brown Soft Sugar",
			strIngredient10: "Peanut Brittle",
			strIngredient11: "",
			strIngredient12: "",
			strIngredient13: "",
			strIngredient14: "",
			strIngredient15: "",
			strIngredient16: "",
			strIngredient17: "",
			strIngredient18: "",
			strIngredient19: "",
			strIngredient20: "",
			strMeasure1: "50g",
			strMeasure2: "175g",
			strMeasure3: "5",
			strMeasure4: "500g",
			strMeasure5: "175g",
			strMeasure6: "175g",
			strMeasure7: "150ml",
			strMeasure8: "275ml",
			strMeasure9: "2 tblsp ",
			strMeasure10: "Crushed",
			strMeasure11: "",
			strMeasure12: "",
			strMeasure13: "",
			strMeasure14: "",
			strMeasure15: "",
			strMeasure16: "",
			strMeasure17: "",
			strMeasure18: "",
			strMeasure19: "",
			strMeasure20: "",
			strSource:
				"https://www.bbcgoodfood.com/recipes/1759649/peanut-butter-cheesecake",
			dateModified: null
		}
	]
};

function extractProps(arr) {
	let ingredients = {}
	let measures = {}
	let res = {
			ingredients: ingredients,
			measures: measures
	}
	arr.map(obj => {
		ingredients[obj.idMeal] = []
		measures[obj.idMeal] = []
		for(let prop in obj) {
			if(prop.includes("strIngredient")) {
				if(obj[prop] !== null) {
					if(obj[prop].length > 0) {
						ingredients[obj.idMeal].push(obj[prop])
					}
				}
			} else if(prop.includes("strMeasure")) {
				if(obj[prop] !== null) {
					if(obj[prop].length > 0) {
						measures[obj.idMeal].push(obj[prop])
					}
				}
			}
		}
	})
	return res;
}

function extractPropsNew(arr) {
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

function useFavorite(recipe) {
	if(Object.keys(recipe).length < 10) {
		return true;
	} else return false;
}

function toSet(arr) {
    let set = new Set();
	arr.map(val => set.add(val))
	let filteredArr = Array.from(set)
	return filteredArr
}

export { sample, extractProps, extractPropsNew, useFavorite, toSet }