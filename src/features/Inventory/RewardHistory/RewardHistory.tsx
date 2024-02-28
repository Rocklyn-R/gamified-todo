import React from 'react';
import "./RewardHistory.css";
import Card from '../../../components/Card/Card';
import { selectUsedRewards } from '../../../store/RewardsSlice';
import { useSelector } from 'react-redux';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { renderIcon } from '../../../utilities/utilities';

export const RewardHistory = () => {
    const usedRewards = useSelector(selectUsedRewards);

    return (
        <Card className="rewards-history">
            <Link to="../inventory"><IoArrowBackOutline className="back-icon" /></Link>
            <h1>Rewards history:</h1>
            {usedRewards.map(item => (
                <div className='inventory-history-box'>
                    <div className='history-container-1'>
                        <img alt="" src={renderIcon(item.icon)} height="24" />
                        <div className='history-container-2'>
                            <p>{item.name}</p>
                            <p className='reward-description'>{item.description}</p>
                        </div>
                    </div>
                    <div className='history-date-used'>
                        <p>Used:</p>
                        <p className='reward-description'>{item.dateUsed}</p>
                    </div>
                </div>

            ))}
        </Card>
    )
}