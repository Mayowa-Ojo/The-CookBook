import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';

const SideBarTablet = () => {
    const [activeItem, setActiveItem] = useState("The CookBook");

    const handleActiveItem = (e, {name}) => {
        setActiveItem(name)
    }

    return (
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
                    onClick={handleActiveItem}
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    as={ Link }
                    to="/newrecipe" 
                    name='Add New Recipe'
                    active={activeItem === 'Add New Recipe'} 
                    onClick={handleActiveItem}
                />
                <Menu.Item
                    as={ Link }
                    to="/favorites"
                    name='Favorite Recipes' 
                    active={activeItem === 'Favorite Recipes'} 
                    onClick={handleActiveItem}
                />
            </Menu.Menu>
        </Menu>
    )
}

export default SideBarTablet;