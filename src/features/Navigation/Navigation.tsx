import React from 'react';
import "./Navigation.css";
import { Link } from 'react-router-dom';
import tomatoImg from "../../Images/tomato.png"
import { FaTasks } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import lightbulb from "../../Images/lightbulb.svg"
import statistics from "../../Images/statistics.svg"




export const Navigation = () => {
    return (
        <header className="navbar">
            <ul>
                <li><Link to="/tasks">
                    <FaTasks className='tasks-icon' />
                    <span className="nav-text">Tasks</span>
                </Link></li>
                <li><Link to="/pomodoro">
                        <img src={tomatoImg} width="24" height="24" alt="Pomodoro" />
                        <span className="nav-text">Pomodoro</span>
                    </Link>
                </li>
                <li><Link to="/shop">
                    <FaShoppingCart className='shopping-icon' />
                    <span className="nav-text">Shopping</span>
                    </Link></li>
                <li><Link to="/stats">
                        <img src={statistics} width="24" height="24" alt="Statistics" />
                        <span className="nav-text">Statistics</span>
                    </Link></li>
                <li><Link to="/help">
                        <img src={lightbulb} width="24" height="24" alt="Help" />
                        <span className="nav-text">Help</span>
                    </Link></li>
            </ul>
        </header>
    )
}