import React from 'react';
import "./RewardHistory.css";
import Card from '../../../components/Card/Card';
import { selectUsedRewards } from '../../../store/RewardsSlice';
import { useSelector } from 'react-redux';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export const RewardHistory = () => {
    const usedRewards = useSelector(selectUsedRewards);

    return (
        <Card className="rewards-box">
            <Link to="../inventory"><IoArrowBackOutline className="back-icon" /></Link>
            <h1>Rewards history:</h1>
            <ul>
                {usedRewards.map(item => (
                    <li>{item.name}</li>
                ))}
            </ul>
        </Card>
    )
}