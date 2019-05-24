import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Button, Card, Icon, Header, Image, Input, Dropdown, Rating, Popup } from 'semantic-ui-react';
import '../styles/CookBook.css';
import RecipeCard from './RecipeCard';
import RecipeMenu from './RecipeMenu';
import { sample, extractProps } from '../helpers/helpers';

const baseURL = `https://www.themealdb.com/api/json/v1/1/`;

class CookBook extends Component {
	static defaultProps = {
		meals: sample.meals
	}
	constructor(props) {
		super(props)
		this.state = {
			isCardSmall: true,
			searchRecipe: "",
			randomRecipe: [],
			recipes: [],
			isError: false,
			isRandom: false,
			rating: null,
			maxRating: null
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
		this.setState({
			randomRecipe: [...data],
			isRandom: true
		})
	}

	handleSearchChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})		
	}

	handleSearchResult = async () => {
		const {searchRecipe} = this.state;
		let url = `${baseURL}search.php?s=${searchRecipe}`
		const data = await this.fetchMeal(url);
		if(data !== null) {
			this.setState((st) => ({
				recipes: [...st.recipes, ...data],
				isRandom: false,
				searchRecipe: "",
				isError: false
			}));
		} else {
			this.setState({
				isError: true,
				searchRecipe: ""
			})
		}
		// console.log(recipeData);
	}

	handleFullDispay = () => {
		this.setState((st) => ({
			isCardSmall: !st.isCardSmall
		}))
	}

	handleRate = (e, {rating, maxRating}) => {
		this.setState({
			rating,
			maxRating
		})
	}	
	
	// =================================================================================================

	render() {
		const {isCardSmall, searchRecipe, recipes, isError, isRandom, randomRecipe} = this.state;
		// console.log(randomRecipe[0])
		const {meals, addFavorite} = this.props;
		const meal = meals[0];

		const card = recipes.map((recipe) => {
			if(Object.keys(recipe).length > 2) {
				return <RecipeCard recipe={recipe} key={recipe.idMeal} rating={this.handleRate} addFavorite={addFavorite} />
			}
		})

		const randomCard = randomRecipe.map((recipe) => {
			return <RecipeCard recipe={recipe} key={recipe.idMeal} rating={this.handleRate} addFavorite={addFavorite} />
		})

		// =================================================================================================
		const ingData = extractProps(meals)
		// console.log(ingData);
		const ingredients = ingData.ingredients[meal.idMeal].map((ing, idx) => <p>{ing}</p>)
		const hyphen = ingData.ingredients[meal.idMeal].map((val, idx) => <p> - </p>)
		const measures = ingData.measures[meal.idMeal].map((amt, idx) => <p>{amt}</p>)
		
		const extraContent = (
			<Fragment>
				<Card.Content>
					<Card.Header textAlign="center" color="steelblue">How?</Card.Header>
					<Card.Description>{meal.strInstructions}</Card.Description>
					<Card.Header color="teal">Ingredients</Card.Header>
				</Card.Content>
				<Card.Content>
					<div className="RecipeCard-ingredients">
						<Card.Meta> {ingredients} </Card.Meta> 
						<Card.Header> {hyphen} </Card.Header> 
						<Card.Meta> {measures} </Card.Meta>
					</div>                    
				</Card.Content>
			</Fragment>			
		)

		const dailyRecipe = (
			<div className="CookBook-card">
				<Card color="orange" fluid>
					<Image src="https://www.themealdb.com/images/media/meals/qtuuys1511387068.jpg" wrapped ui={false} />
					<Card.Content>
						<Card.Header color="teal">{meal.strMeal}</Card.Header>
						<Card.Meta>Category: {meal.strCategory}</Card.Meta>
						<Card.Meta>
							<Rating maxRating={5} onRate={this.handleRate} clearable />
							<Popup 
								content="Add this recipe to your favorites" 
								trigger={<Icon 
											className="CookBook-favorite-icon" 
											name="heart" 
											link 
											onClick={() => addFavorite(meal.idMeal)} 
											color="red"
										/>}
								position="left center"
								inverted
							/>
						</Card.Meta>						
					</Card.Content>						
					{isCardSmall ? null : extraContent}
					<Card.Content extra>
						<div>
							<Button 
								compact 
								size="mini"
								color={isCardSmall ? "green" : "grey"}
								floated="right" 
								onClick={this.handleFullDispay}
							>
								{isCardSmall ? "More..." : "...Less"}
							</Button>
						</div>
					</Card.Content>
				</Card>
			</div>
		)		

		// =====================================================================================
		
		return (
		  <div className="CookBook">
			  <RecipeMenu />
			  <Header as="h1" textAlign="center">The CookBook</Header>
			  <div className="CookBook-content">
				<section className="CookBook-aside">
					<div className="CookBook-search">
						<Header as='h3'>Search Popular Recipes: </Header>
						<Input 
							fluid
							error = {isError}						
							icon={
								<Icon 
									name='search' 
									inverted 
									circular 
									link 
									onClick={this.handleSearchResult}
								/>
							} 
							placeholder={isError ? "No recipe match, try again" : "Search"} 
							name="searchRecipe" 
							value={searchRecipe} 
							onChange={this.handleSearchChange}					 
						/>
					</div>
					<div className="CookBook-dropdown">
						<Header>Filter by category: </Header>
						<Dropdown text='Filter' icon='filter' floating labeled button fluid className='icon'>
							<Dropdown.Menu>
								<Dropdown.Header icon='tags' content='Filter by category' />
								<Dropdown.Item>Seafood</Dropdown.Item>
								<Dropdown.Item>Desert</Dropdown.Item>
								<Dropdown.Item>Beef</Dropdown.Item>
								<Dropdown.Item>Chicken</Dropdown.Item>
								<Dropdown.Item>Lamb</Dropdown.Item>
								<Dropdown.Item>Pasta</Dropdown.Item>
								<Dropdown.Item>Pork</Dropdown.Item>
								<Dropdown.Item>Side</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<div>
						<h3>Not sure what you're looking for?</h3>
						<Button onClick={this.getRandomRecipe}>Surprise me!</Button>
					</div>					
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