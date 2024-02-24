import React from "react";
import "./RewardItem.css";
import { Reward } from "../../../types/Types";
import { FaCoins } from "react-icons/fa";
import { renderIcon } from "../../../utilities/utilities";

interface RewardItemProps {
    reward: Reward;
    index: number;
    handleViewReward: (reward: Reward) => void;
    inventory: boolean;
}

export const RewardItem: React.FC<RewardItemProps> = ({reward, index, handleViewReward, inventory}) => {
    return (
        <div className="reward-item">
            <button 
                className="view-reward"
                onClick={() => {handleViewReward(reward)}}
            >
                <img alt="" src={renderIcon(reward.icon)} />
                <div className="reward-details">
                    <p>{reward.name}</p>  
                <p>{reward.description}</p>
                {!inventory && (
                    <div className="price-details">
                    <FaCoins className="coins-icon" />
                    <p>{reward.price}</p>
                </div>
                )}
                
                
                </div>
              
            </button>
        </div>
    )
}