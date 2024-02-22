import React from "react";
import Card from "../../../../components/Card/Card";
import { selectInventory } from "../../../../store/RewardsSlice";
import { useSelector, useDispatch } from "react-redux";
import { Reward } from "../../../../types/Types";
import { RewardItem } from "../../RewardItem/RewardItem";
import { FaCoins } from "react-icons/fa";
import { spendReward } from "../../../../store/RewardsSlice";


interface ViewInventoryItem {
    selectedInventoryItem: Reward;
    hideInventoryItem: () => void;
}

export const ViewInventoryItem: React.FC<ViewInventoryItem> = ({ selectedInventoryItem, hideInventoryItem }) => {


    const dispatch = useDispatch();

    const handleUseReward = () => {
        dispatch(spendReward(selectedInventoryItem));
        hideInventoryItem();
    }
  
    return (
        <Card>
            <p>Name: {selectedInventoryItem.name}</p>
            {selectedInventoryItem.description && <p>Description: {selectedInventoryItem.description}</p>}
            <p>Purchased for {selectedInventoryItem.price} <FaCoins/></p>
            <button onClick={handleUseReward} >Use</button>
        </Card>
    )
}