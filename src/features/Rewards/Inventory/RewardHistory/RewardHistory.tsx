import React from 'react';
import Card from '../../../../components/Card/Card';
import { selectUsedRewards } from '../../../../store/RewardsSlice';
import { useSelector } from 'react-redux';

export const RewardHistory = () => {
    const usedRewards = useSelector(selectUsedRewards);

    return (
        <Card className="rewards-container">
            <h1>Reward History</h1>
            <ul>
                {usedRewards.map(item => (
                    <li>{item.name}</li>
                ))}
            </ul>
        </Card>
    )
}