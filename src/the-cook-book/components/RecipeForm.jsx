import React, { Component } from 'react';
import '../styles/RecipeForm.css';
import { Header, Form, Button, Responsive } from 'semantic-ui-react';

const options = [
	{text: "Desert", value: "desert"},
	{text: "Seafood", value: "seafood"},
	{text: "Beef", value: "beef"},
	{text: "Chicken", value: "chicken"},
	{text: "Lamb", value: "lamb"},
	{text: "Pasta", value: "pasta"},
	{text: "Pork", value: "pork"},
	{text: "Side", value: "side"}
]

class RecipeForm extends Component {
	state = {
		strMeal: "",
		ingredients: [""],
		measures: [""],
		strInstructions: "",
		strMealThumb: "",
		strCategory: ""
	}

	handleNewIngredient = (e) => {
		e.preventDefault()
		this.setState((st) => ({
			ingredients: [...st.ingredients, ""],
			measures: [...st.measures, ""]
		}))
	}

	handleIngredientChange = (e, {name, value}) => {
		const { ingredients } = this.state;
		const index = Number(name.split("-")[1]);
		const ingredient = ingredients.map((ing, i) => {
			return i === index ? value : ing
		});
		this.setState({ ingredients: ingredient	});
	}

	handleMeasureChange = (e, {name, value}) => {
		const { measures } = this.state;
		const index = Number(name.split("-")[1]);
		const measure = measures.map((amt, i) => {
			return i === index ? value : amt
		});
		this.setState({	measures: measure });
	}

	handleChange = (e, {name, value}) => {
		this.setState({
			[name]: value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addRecipe(this.state);
		this.setState({
			strMeal: "",
			ingredients: [""],
			measures: [""],
			strInstructions: "",
			strMealThumb: ""
		})
		this.props.history.push("/favorites")
	}

	render() {
		const {strMeal, ingredients, measures, strInstructions, strMealThumb} = this.state;
		const ingInputs = ingredients.map((ing, i) => {
					return (
						<Form.Input							
							key={`ingredient${i}`}
							size="mini"
							label={`Ingredient-${i+1}`} 
							name={`ingredient-${i}`} 
							value={ing} 
							placeholder="ingredient" 
							// width={6} 
							onChange={this.handleIngredientChange} 
						/>						
					)
		})
		const measureInputs = measures.map((amt, i) => {
					return (							
						<Form.Input 
							key={`measure${i}`}
							size="mini"
							label={`Measure-${i+1}`} 
							name={`measure-${i}`} 
							value={amt} 
							placeholder="measure" 
							// width={6} 
							onChange={this.handleMeasureChange} 
						/>
					)
		})


		return (
		  <div className="RecipeForm">
			  {/* <RecipeMenu /> */}
			  <Header as="h1" textAlign="center">Add New Recipe</Header>
			  <div className="RecipeForm-container">				
				<Form onSubmit={this.handleSubmit}>
					<Responsive minWidth={Responsive.onlyTablet.minWidth}>					
						<Form.Group>
							<Form.Input label="Meal" name="strMeal" value={strMeal} placeholder="meal title" width={10} onChange={this.handleChange} />
							<Form.Select fluid label='Category' name="strCategory" options={options} placeholder='Category' width={6} onChange={this.handleChange}/>														
						</Form.Group>
					</Responsive>

					<Responsive {...Responsive.onlyMobile}>
						<Form.Group>
							<Form.Input label="Meal" name="strMeal" value={strMeal} placeholder="meal title" width={10} size="mini" onChange={this.handleChange} />
							<Form.Select fluid label='Category' name="strCategory" options={options} placeholder='Category' width={4} size="mini" onChange={this.handleChange}/>														
						</Form.Group>
					</Responsive>
					
					<Responsive minWidth={Responsive.onlyTablet.minWidth}>
						<Form.Group widths={1}>
							<div className="RecipeForm-input">{ingInputs}</div>
							<div className="RecipeForm-input">{measureInputs}</div>							
						</Form.Group>
					</Responsive>

					<Responsive {...Responsive.onlyMobile}>
						<Form.Group widths={2}>
							<div className="RecipeForm-input">{ingInputs}</div>
							<div className="RecipeForm-input">{measureInputs}</div>							
						</Form.Group>
					</Responsive>

					<Button 
						size="mini"
						circular
						onClick={this.handleNewIngredient}
					>
						+
					</Button>

					<Form.TextArea rows={6} label="Instructions" name="strInstructions" value={strInstructions} placeholder="add instructions" onChange={this.handleChange} />
					<Form.Input label="Image" name="strMealThumb" value={strMealThumb} placeholder="image url" width={10} onChange={this.handleChange} />
					
					<Responsive minWidth={Responsive.onlyTablet.minWidth}>
						<Form.Button color="teal">Add</Form.Button>
					</Responsive>
					
					<Responsive {...Responsive.onlyMobile}>
						<Form.Button size="mini" color="teal">Add</Form.Button>
					</Responsive>					
				</Form>
			  </div>
			  
		  </div>
		)
	}
}

export default RecipeForm;
