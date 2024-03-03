import React from "react";
import './ViewInventoryItem.css';
import Card from "../../../components/Card/Card";
import { useDispatch } from "react-redux";
import { InventoryItem } from "../../../types/Types";
import { FaCoins } from "react-icons/fa";
import { spendReward } from "../../../store/RewardsSlice";
import { renderIcon } from "../../../utilities/utilities";



interface ViewInventoryItemProps {
    selectedInventoryItem: InventoryItem;
    hideInventoryItem: () => void;
}

export const ViewInventoryItem: React.FC<ViewInventoryItemProps> = ({ selectedInventoryItem, hideInventoryItem }) => {


    const dispatch = useDispatch();

    const handleUseReward = () => {
        dispatch(spendReward(selectedInventoryItem));
        hideInventoryItem();
    }
  
    return (
        <Card className="overlay-card">
            <img alt="" src={renderIcon(selectedInventoryItem.icon)} height="40" width="40" />
            <p>Name: {selectedInventoryItem.name}</p>
            {selectedInventoryItem.description && <p>Description: {selectedInventoryItem.description}</p>}
            <p className='view-item-price-details'>Purchased for <FaCoins className="coins-icon view-coins-icon"/>{selectedInventoryItem.price} </p>
            <button className="command-button" onClick={handleUseReward} >Use</button>
        </Card>
    )
}