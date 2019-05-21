import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import './App.css';
import CookBook from './CookBook';
import RecipeForm from './RecipeForm';
import Favorites from './Favorites';

class App extends Component {
    state = {
        favoriteRecipes: []
    }

    handleAddRecipe = (recipe) => {
        this.setState((st) => ({
            favoriteRecipes: [...st.favoriteRecipes, recipe]
        }))

    }

    render() {
        const {favoriteRecipes} = this.state;
        return (       
            <div>
                <Switch>
                    <Route exact path="/" component={CookBook} />
                    <Route exact path="/newrecipe" render={(routeProps) => <RecipeForm {...routeProps} addRecipe={this.handleAddRecipe} />} />
                    <Route exact path="/favorites" render={() => <Favorites favoriteRecipe={favoriteRecipes} />} />
                </Switch> 
            </div>
        )
    }
}

export default App;