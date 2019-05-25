import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import uuid from 'uuid/v4';
import './styles/App.css';
import CookBook from './components/CookBook';
import RecipeForm from './components/RecipeForm';
import Favorites from './components/Favorites';
import { toSet } from './helpers/helpers';

class App extends Component {
    state = {
        newRecipes: [],
        favorites: []
    }

    componentDidMount() {
        this.setState({
            favorites: JSON.parse(localStorage.getItem("favorites")) || []
        })
    }

    handleAddRecipe = (recipe) => {
        const newRecipe = {...recipe, idMeal: uuid()}
        this.setState((st) => ({
            newRecipes: [...st.newRecipes, newRecipe]
        }))

    }

    handAddFavorite = (id) => {
        const {favorites} = this.state;
        const filterArr = [...favorites, id]        
        const updatedState = toSet(filterArr)

        this.setState((st) => ({
            favorites: [...updatedState]
        }), () => localStorage.setItem("favorites", JSON.stringify(this.state.favorites)))               
    }

    handleRemoveFavorite = (id) => {
        const {favorites} = this.state;
        const updatedState = favorites.filter(fav => fav !== id);
        
        this.setState((st) => ({
            favorites: [...updatedState]
        }), () => localStorage.setItem("favorites", JSON.stringify(this.state.favorites)))
        console.log(id);
    }

    render() {
        const {newRecipes, favorites} = this.state;
        return (       
            <div>
                <Switch>
                    <Route exact path="/" render={() => <CookBook addFavorite={this.handAddFavorite} />} />
                    <Route exact path="/newrecipe" render={(routeProps) => <RecipeForm {...routeProps} addRecipe={this.handleAddRecipe} />} />
                    <Route exact path="/favorites" render={() => <Favorites newRecipes={newRecipes} favorites={favorites} removeFavorite={this.handleRemoveFavorite}/>} />
                </Switch> 
            </div>
        )
    }
}

export default App;