import React from 'react';
import '../styles/Favorites.css';
import axios from 'axios';
import RecipeMenu from './RecipeMenu';
import RecipeCard from './RecipeCard';
import { extractPropsNew } from '../helpers/helpers';

const Favourites = (props) => {
    const {removeFavorite, newRecipes, favorites} = props
    const newRecipeCard = newRecipes.map((recipe) => {
        return <RecipeCard recipe={recipe} key={recipe.idMeal} canDelete={true} removeFavorite={removeFavorite} />
    })
    
    // TODO: make api call to retrieve favorite recipe based on idMeal
    // const favoriteCard = favorites.map((recipe) => {
    //     return <RecipeCard recipe={recipe} key={recipe.idMeal} canDelete={true} removeFavorite={removeFavorite} />
    // })

    return (
        <div>
            <RecipeMenu />
            <h1>Favorite Recipes</h1>
            <div className="Favorites-container">
                {newRecipeCard}
                {/* {favoriteCard} */}
            </div>            
        </div>
    )
}

export default Favourites;
