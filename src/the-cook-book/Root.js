import React from 'react';
import { Responsive } from 'semantic-ui-react';
import App from './components/App';
import SideBarTablet from './components/SideBar_Tablet';
import SideBarMobile from './components/SideBar_Mobile';
import './Root.css';

const SideBar = () => {    
    return (
        <div>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <SideBarTablet />
                <App />
            </Responsive>

            <Responsive {...Responsive.onlyMobile}>
                <SideBarMobile />
            </Responsive>
        </div>
    )
    
}

export default SideBar;