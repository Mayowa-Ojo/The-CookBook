import React from 'react';
import { Card, Image, Rating, Icon, Popup } from 'semantic-ui-react';
import '../styles/RecipeCard.css';
import { extractProps, useFavorite } from '../helpers/helpers';

const RecipeCard = (props) => {
	const { idMeal, strMeal, strCategory, strInstructions, strMealThumb } = props.recipe;
	const { ingredients: favIngredients, measures: favMeasures } = props.recipe;
	const { addFavorite, canDelete, removeFavorite } = props;
	// ==================================================================================
	const recipeArr = []
	recipeArr.push(props.recipe)
	const extractedData = extractProps(recipeArr)
	// console.log(useFavorite(props.recipe))
	const ingredients = (
		useFavorite(props.recipe) 
		?  favIngredients.map(ing => <p>{ing}</p>)
		: extractedData.ingredients[idMeal].map(ing => <p>{ing}</p>)
	)
	const hyphen = (
		useFavorite(props.recipe)
		? favIngredients.map(val => <p>-</p>)
		: extractedData.ingredients[idMeal].map(val => <p>-</p>)
	)
	const measures = (
		useFavorite(props.recipe)
		? favMeasures.map(amount => <p>{amount}</p>)
		: extractedData.measures[idMeal].map(amount => <p>{amount}</p>)
	)

	const popup = (
		canDelete 
		?	<Popup 
				content="Remove this recipe from your favorites" 
				trigger={<Icon 
							className="RecipeCard-favorite-icon" 
							name="heart" 
							link 
							onClick={() => removeFavorite(idMeal)} 
							color="grey"
						/>}
				position="left center"
				inverted
			/>
		:	<Popup 
				content="Add this recipe to your favorites" 
				trigger={<Icon 
							className="RecipeCard-favorite-icon" 
							name="heart" 
							link 
							onClick={() => addFavorite(idMeal)} 
							color="red"
						/>}
				position="left center"
				inverted
			/>
	) 
	// ==================================================================================
	return(
		<div className="RecipeCard">
			<Card color="orange" centered>
				<Image src={strMealThumb} wrapped ui={false} />
				<Card.Content>
					<Card.Header color="teal">{strMeal}</Card.Header>
					<Card.Meta>Category: {strCategory}</Card.Meta>
					<Card.Meta>
						<Rating maxRating={5} onRate={null} clearable />
						{popup}
					</Card.Meta>
				</Card.Content>						
				<Card.Content>
					<Card.Header textAlign="center" color="steelblue">How?</Card.Header>
					<Card.Description>{strInstructions}</Card.Description>
				</Card.Content>
				<Card.Content>
					<Card.Header color="teal">Ingredients</Card.Header>
					<div className="RecipeCard-ingredients">
						<Card.Meta> {ingredients} </Card.Meta> 
						<Card.Header> {hyphen} </Card.Header> 
						<Card.Meta> {measures} </Card.Meta>
					</div>                    
				</Card.Content>
			</Card>
		</div>
	)
}

export default RecipeCard;