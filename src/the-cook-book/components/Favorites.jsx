import React from 'react';
import '../styles/Favorites.css';
import RecipeMenu from './RecipeMenu';
import RecipeCard from './RecipeCard';


const Favourites = (props) => {
    const {removeFavorite, newRecipes, favorites, isCardSmall, fullDisplay} = props    
          
    const newRecipeCard = newRecipes.map((recipe) => {
        return <RecipeCard 
                    recipe={recipe} 
                    key={recipe.idMeal} 
                    canDelete={true} 
                    removeFavorite={removeFavorite}
                    isCardSmall={isCardSmall}
                    fullDisplay={fullDisplay}
                    useClass={false}
                />
    })
    
    const favoriteCard = favorites.map((recipe) => {
        return <RecipeCard 
                    recipe={recipe} 
                    key={recipe.idMeal} 
                    canDelete={true} 
                    removeFavorite={removeFavorite}
                    isCardSmall={isCardSmall}
                    fullDisplay={fullDisplay}
                    useClass={false}
                />
    });

    return (
        <div>
            <RecipeMenu />
            <h1>Favorite Recipes</h1>
            <div className="Favorites-container">
                {newRecipeCard}
                {favoriteCard}
            </div>            
        </div>
    )
}

export default Favourites;
