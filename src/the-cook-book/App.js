import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import uuid from 'uuid/v4';
import './styles/App.css';
import CookBook from './components/CookBook';
import RecipeForm from './components/RecipeForm';
import Favorites from './components/Favorites';

class App extends Component {
    state = {
        favoriteRecipes: [],
        favorites: JSON.parse(window.localStorage.getItem("favorites") || "[]")
    }

    handleAddRecipe = (recipe) => {
        const updatedRecipe = {...recipe, idMeal: uuid()}
        this.setState((st) => ({
            favoriteRecipes: [...st.favoriteRecipes, updatedRecipe]
        }))

    }

    handAddFavorite = (id) => {
        const {favorites} = this.state;
        console.log(id)
        this.setState((st) => ({
            favorites: [...st.favorites, id]
        }), () => window.localStorage.setItem("favorites", JSON.stringify(favorites)))
    }

    render() {
        const {favoriteRecipes} = this.state;
        return (       
            <div>
                <Switch>
                    <Route exact path="/" render={() => <CookBook addFavorite={this.handAddFavorite} />} />
                    <Route exact path="/newrecipe" render={(routeProps) => <RecipeForm {...routeProps} addRecipe={this.handleAddRecipe} />} />
                    <Route exact path="/favorites" render={() => <Favorites favoriteRecipe={favoriteRecipes} />} />
                </Switch> 
            </div>
        )
    }
}

export default App;