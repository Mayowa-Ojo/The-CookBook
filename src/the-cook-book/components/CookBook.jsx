import React, { Component } from 'react';
import axios from 'axios';
import { Header} from 'semantic-ui-react';
import '../styles/CookBook.css';
import RecipeCard from './RecipeCard';
import { sample, extractProps } from '../helpers/helpers';
import Aside from './Aside';

const baseURL = `https://www.themealdb.com/api/json/v1/1/`;

class CookBook extends Component {
	static defaultProps = {
		meals: sample.meals
	}
	constructor(props) {
		super(props)
		this.state = {
			isCardSmall: true,
			recipeId: "",
			randomRecipe: [],
			recipes: [],
			isError: false,
			isRandom: false,
		}
	}

	fetchMeal = async (url) => {
		let res = await axios.get(url)
		let recipeData = await res.data.meals;
		return recipeData;
	}

	async componentDidMount() {
		let url = `${baseURL}random.php`;
		await this.fetchMeal(url);
	}

	getRandomRecipe = async () => {
		let url = `${baseURL}random.php`;
		const data = await this.fetchMeal(url)
		const parsedData = extractProps(data)
		this.setState({
			randomRecipe: [...parsedData],
			isRandom: true
		})
	}	

	handleSearchResult = async (searchQuery) => {
		// console.log(searchQuery)
		let url = `${baseURL}search.php?s=${searchQuery}`
		const data = await this.fetchMeal(url);
		if(data !== null) {
			const parsedData = extractProps(data)
			this.setState((st) => ({
				recipes: [...st.recipes, ...parsedData],
				isRandom: false,
				isError: false
			}));
		} else {
			this.setState({
				isError: true,
			})
		}
	}

	handleFullDisplay = (id) => {
		this.setState((st) => ({
			isCardSmall: !st.isCardSmall,
			recipeId: id
		}))
	}
	
	// =================================================================================================

	render() {
		const {isCardSmall, recipes, isError, isRandom, randomRecipe, recipeId} = this.state;
		const {meals, addFavorite} = this.props;

		const card = recipes.map((recipe) => 
			<RecipeCard 
				recipe={recipe} 
				key={recipe.idMeal} 
				rating={this.handleRate} 
				addFavorite={addFavorite} 
				canDelete={false}
				fullDisplay={this.handleFullDisplay}
				isCardSmall={recipe.idMeal === recipeId ? isCardSmall : true}
				useClass={true}
			/>
		)

		const randomCard = randomRecipe.map((recipe) => {
			return <RecipeCard 
						recipe={recipe} 
						key={recipe.idMeal} 
						rating={this.handleRate} 
						addFavorite={addFavorite} 
						canDelete={false}
						fullDisplay={this.handleFullDisplay}
						isCardSmall={isCardSmall}
						useClass={true}
					/>
		})

		// =====================================================================================
		// WARNING: Breaking Changes
		const parsedData = extractProps(meals);
		const dailyRecipe = parsedData.map((recipe) => {
			return <RecipeCard 
						recipe={recipe} 
						key={recipe.idMeal} 
						rating={this.handleRate} 
						addFavorite={addFavorite} 
						canDelete={false}
						label={true}
						fullDisplay={this.handleFullDisplay}
						isCardSmall={isCardSmall}
						useClass={true}
					/>
		})
		// =====================================================================================

		return (
		  <div className="CookBook">
			  {/* <RecipeMenu /> */}
			  <Header as="h1" color="orange" textAlign="center">The Chef</Header>
			  <div className="CookBook-content">
				<section className="CookBook-aside">
					<Aside isError={isError} getRandomRecipe={this.getRandomRecipe} search={this.handleSearchResult} />
				</section>

				<section className="CookBook-main">
					<Header 
						textAlign="center" 
						color="teal"
					>
						{!isRandom ? (recipes.length < 1 ? "Meal of the Day" : `About ${recipes.length} results found`) : "Impressed?"}
					</Header>					
					{!isRandom ? (recipes.length < 1 ? dailyRecipe : card) : randomCard}					
				</section>								
			  </div>              
		  </div>
		)
	}
}

export default CookBook;