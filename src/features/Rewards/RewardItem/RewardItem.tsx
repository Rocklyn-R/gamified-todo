import React from "react";
import "./RewardItem.css";
import { Reward } from "../../../types/Types";

interface RewardItemProps {
    reward: Reward;
    index: number;
    handleViewReward: (reward: Reward) => void;
    inventory?: boolean;
}

export const RewardItem: React.FC<RewardItemProps> = ({reward, index, handleViewReward}) => {
    return (
        <div className="reward-item">
            <button 
                className="view-reward"
                onClick={() => {handleViewReward(reward)}}
            >
                {reward.name}
            </button>
        </div>
    )
}