import React, { Fragment, useState } from 'react';

const SideBar = (props) => {
    const [searchQuery, setsearchQuery] = useState("");

    return(
        <Fragment>
            <div className="CookBook-search">
				<Header as='h3'>Search Popular Recipes: </Header>
				<Input 
					fluid
					error = {isError}						
					icon={
						<Icon 
							name='search' 
							inverted 
							circular 
							link 
							onClick={this.handleSearchResult}
						/>
					} 
					placeholder={isError ? "No recipe match, try again" : "Search"} 
					name="searchRecipe" 
					value={searchRecipe} 
					onChange={this.handleSearchChange}					 
				/>
			</div>
			<div className="CookBook-dropdown">
				<Header>Filter by category: </Header>
				<Dropdown text='Filter' icon='filter' floating labeled button fluid className='icon'>
					<Dropdown.Menu>
						<Dropdown.Header icon='tags' content='Filter by category' />
						<Dropdown.Item>Seafood</Dropdown.Item>
						<Dropdown.Item>Desert</Dropdown.Item>
						<Dropdown.Item>Beef</Dropdown.Item>
						<Dropdown.Item>Chicken</Dropdown.Item>
						<Dropdown.Item>Lamb</Dropdown.Item>
						<Dropdown.Item>Pasta</Dropdown.Item>
						<Dropdown.Item>Pork</Dropdown.Item>
						<Dropdown.Item>Side</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
			<div>
				<h3>Not sure what you're looking for?</h3>
				<Button onClick={this.getRandomRecipe}>Surprise me!</Button>
			</div>
        </Fragment>
    )
}

export default SideBar;