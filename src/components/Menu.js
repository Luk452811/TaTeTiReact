import React from 'react';
import './Menu.css';
import titleImage from '../images/title.png';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div className="menu">
            <div className="menu-title-container" >
            </div>
            <div className="play-button-container">
                <Link to="/game">
                    <button className="play-button">Play The Game</button>
                </Link>
            </div>
        </div>
    );
}

export default Menu;
