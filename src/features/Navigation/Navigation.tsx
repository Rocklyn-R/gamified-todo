import React from 'react';
import "./Navigation.css";
import { Link } from 'react-router-dom';



export const Navigation = () => {
    return (
        <header className="navbar">
            <ul>
                <li><Link to="/tasks">Tasks</Link></li>
                <li><Link to="/pomodoro">Pomodoro</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/stats">Stats</Link></li>
                <li><Link to="/help">Help</Link></li>
            </ul>
        </header>
    )
}