import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import uuid from 'uuid/v4';
import '../styles/App.css';
import CookBook from './CookBook';
import RecipeForm from './RecipeForm';
import Favorites from './Favorites';
import { extractProps, toSet } from '../helpers/helpers';

const baseURL = `https://www.themealdb.com/api/json/v1/1/`;

class App extends Component {
    state = {
        newRecipes: [],
        favIds: [],
        favoritesData: [],
        isCardSmall: true,
        recipeId: ""
    }

    fetchMeal = async (url) => {
		let res = await axios.get(url)
		let recipeData = await res.data.meals;
		return recipeData;
	}

    componentDidMount() {
        this.setState((st) => ({
            favIds: JSON.parse(localStorage.getItem("favorites")) || []
        }), this.getRecipe )
    }    

    async getRecipe (state) {
        const  favIds = state !== undefined ? state : this.state.favIds;
        // console.log(`state at the beginning...${favIds}`)
        let data;
        let promises = []
        for(let i = 0; i < favIds.length; i++){
            let url = `${baseURL}lookup.php?i=${favIds[i]}`
            promises.push(this.fetchMeal(url))
        }
        data = await Promise.all(promises)
        let parsedData = data.map(recipe => extractProps(recipe)).flat()
        // console.log(parsedData)

        this.setState(st => ({
            favoritesData: [...parsedData]
        }))
    }    

    handleAddRecipe = (recipe) => {
        const newRecipe = {...recipe, idMeal: uuid()}
        this.setState((st) => ({
            newRecipes: [...st.newRecipes, newRecipe]
        }))

    }

    handAddFavorite = (id) => {
        const { favIds } = this.state;
        const filterArr = [...favIds, id]        
        const updatedState = toSet(filterArr)

        this.setState((st) => ({
            favIds: [...updatedState]
        }), () => localStorage.setItem("favorites", JSON.stringify(this.state.favIds)), this.getRecipe(updatedState))
    }

    handleRemoveFavorite = (id) => {
        const {favIds} = this.state;
        const updatedState = favIds.filter(fav => fav !== id);
        // console.log("removing...")
        localStorage.removeItem("favorites")
        // console.log(`removed, ${id}`)
        this.setState((st) => ({
            favIds: [...updatedState]
        }), () => localStorage.setItem("favorites", JSON.stringify(this.state.favIds)), this.getRecipe(updatedState))
        // console.log("updated!");
    }

    handleFullDisplay = (id) => {
		this.setState((st) => ({
            isCardSmall: !st.isCardSmall,
            recipeId: id
        }))
    }
    
    render() {
        const { newRecipes, favoritesData, isCardSmall, recipeId } = this.state;
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={() => <CookBook addFavorite={this.handAddFavorite} />} />
                    <Route 
                        exact 
                        path="/newrecipe" 
                        render={(routeProps) => <RecipeForm 
                                                    {...routeProps} 
                                                    addRecipe={this.handleAddRecipe} />} 
                                                />
                    <Route 
                        exact 
                        path="/favorites" 
                        render={() => <Favorites 
                            newRecipes={newRecipes}
                            favorites={favoritesData}  
                            removeFavorite={this.handleRemoveFavorite}
                            fullDisplay={this.handleFullDisplay}
                            isCardSmall={isCardSmall}
                            recipeId={recipeId}
                        />} 
                    />
                </Switch> 
            </div>
        )
    }
}

export default App;