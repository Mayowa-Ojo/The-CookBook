import React from 'react';
import '../styles/Favorites.css';
import RecipeMenu from './RecipeMenu';
import RecipeCard from './RecipeCard';

const Favourites = (props) => {
    const favoriteCard = props.favoriteRecipe.map((recipe) => {
        return <RecipeCard recipe={recipe} key={recipe.idMeal} />
    })

    return (
        <div>
            <RecipeMenu />
            <h1>Favorite Recipes</h1>
            <div className="Favorites-container">
                {favoriteCard}
            </div>            
        </div>
    )
}

export default Favourites;
