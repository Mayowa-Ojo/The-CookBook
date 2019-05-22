import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import uuid from 'uuid/v4';
import './App.css';
import CookBook from './CookBook';
import RecipeForm from './RecipeForm';
import Favorites from './Favorites';

class App extends Component {
    state = {
        favoriteRecipes: [],
        favorites: new Set
    }

    handleAddRecipe = (recipe) => {
        const updatedRecipe = {...recipe, idMeal: uuid()}
        this.setState((st) => ({
            favoriteRecipes: [...st.favoriteRecipes, updatedRecipe]
        }))

    }

    handAddFavorite = (id) => {
        console.log(id)
        this.setState((st) => ({
            favorites: st.favorites.add(id)
        }))
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