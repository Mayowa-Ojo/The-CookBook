import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import './RecipeCard.css';
import { extractProps, useFavorite } from './helpers/sample-recipe';

const RecipeCard = (props) => {
    const { idMeal, strMeal, strCategory, strInstructions, strMealThumb } = props.recipe
    const { ingredients: favIngredients, measures: favMeasures } = props.recipe
    // ==================================================================================
    const recipeArr = []
    recipeArr.push(props.recipe)
    const extractedData = extractProps(recipeArr)
    console.log(useFavorite(props.recipe))
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
    // ==================================================================================
    return(
        <div className="RecipeCard">
            <Card color="orange" centered>
				<Image src={strMealThumb} wrapped ui={false} />
				<Card.Content>
					<Card.Header color="teal">{strMeal}</Card.Header>
					<Card.Meta>Category: {strCategory}</Card.Meta>
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