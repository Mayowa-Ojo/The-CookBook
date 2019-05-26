import React, { Fragment } from 'react';
import { Card, Image, Rating, Icon, Popup, Button } from 'semantic-ui-react';
import '../styles/RecipeCard.css';

const RecipeCard = (props) => {
	const { idMeal, strMeal, strCategory, strInstructions, strMealThumb, ingredients: ingArr, measures: measureArr } = props.recipe;
	// const { ingredients: favIngredients, measures: favMeasures } = props.recipe;
	const { addFavorite, canDelete, removeFavorite, fullDisplay, isCardSmall } = props;
	// ==================================================================================
	// const recipeArr = []
	// recipeArr.push(props.recipe)
	// const extractedData = extractProps(recipeArr)
	// // console.log(useFavorite(props.recipe))
	const ingredients = ingArr.map(ing => <p>{ing}</p>)

	const hyphen = ingArr.map(val => <p>-</p>)

	const measures = measureArr.map(amount => <p>{amount}</p>)

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

	const extraContent = (
		<Fragment>
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
		</Fragment>
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
				{isCardSmall ? null : extraContent}
				<Card.Content extra>
		 			<div>
	 					<Button 
							compact 
							size="mini"
							color={isCardSmall ? "green" : "grey"}
							floated="right" 
							onClick={fullDisplay}
						>
							{isCardSmall ? "More..." : "...Less"}
						</Button>
					</div>
				</Card.Content>
			</Card>
		</div>
	)
}

export default RecipeCard;