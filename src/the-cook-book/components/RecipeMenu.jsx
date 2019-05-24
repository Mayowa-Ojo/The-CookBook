import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import '../styles/RecipeMenu.css';

class RecipeMenu extends Component {
    state = {
        activeItem: "The CookBook"
    }

    handleActiveItem = (e, {name}) => {
        this.setState({
            activeItem: name
        })
    }

    render() {
        const { activeItem } = this.state;
        return (
            <div>
                <Menu inverted fixed="top">
                    <Menu.Item>
                        <Icon name="food" color="orange" />
                    </Menu.Item>
                    <Menu.Item
                            as={ Link }
                            to="/"
                            header
                            name='The CookBook'
                            active={activeItem === 'The CookBook'} 
                            onClick={this.handleActiveItem}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                            as={ Link }
                            to="/newrecipe" 
                            name='Add New Recipe'
                            active={activeItem === 'Add New Recipe'} 
                            onClick={this.handleActiveItem}
                        />
                        <Menu.Item
                            as={ Link }
                            to="/favorites"
                            name='Favorite Recipes' 
                            active={activeItem === 'Favorite Recipes'} 
                            onClick={this.handleActiveItem}
                        />
                    </Menu.Menu>
                </Menu>           
            </div>
        )
    }
    
}

export default RecipeMenu;