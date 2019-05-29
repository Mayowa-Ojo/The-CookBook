import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Responsive, Sidebar } from 'semantic-ui-react';
import App from './components/App';

const SideBar = () => {
    const [activeItem, setActiveItem] = useState("The CookBook");
    const [visible, setVisibility] = useState(false);

    const handleActiveItem = (e, {name}) => {
        setActiveItem(name)
    }

    const handleSidebarHide = () => {
        setVisibility(true)
    }
    
    const handleVisibility = () => {
        setVisibility(prevState => !prevState)
    }
    return (
        <div>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
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
                <App />
            </Responsive>

            <Responsive {...Responsive.onlyMobile} >
                <Sidebar.Pushable>
                    <Sidebar
                        as={Menu}
                        animation="overlay"
                        icon="labeled"
                        inverted
                        vertical
                        visible={visible}  
                        onHide={handleSidebarHide}              
                    >
                        <Menu.Item as='a'>Home</Menu.Item>
                        <Menu.Item as='a'>Games</Menu.Item>
                        <Menu.Item as='a'>Channels</Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher style={{minHeight: "100vh"}}>
                        <Menu inverted>
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
                                <Icon name="sidebar" size="large" style={{color: "white"}} link onClick={handleVisibility} />
                            </Menu.Menu>
                        </Menu>
                        <App />
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Responsive>
        </div>
    )
    
}

export default SideBar;