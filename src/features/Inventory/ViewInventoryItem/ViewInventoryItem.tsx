import React, {useState} from "react";
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

    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    const handleUseReward = () => {
        console.log(quantity);
        dispatch(spendReward({item: selectedInventoryItem, quantity: quantity}));
        hideInventoryItem();
    }

    return (
        <Card className="overlay-card">
            <img alt="" src={renderIcon(selectedInventoryItem.icon)} height="40" width="40" />
            <p>Name: {selectedInventoryItem.name}</p>
            {selectedInventoryItem.description && <p>Description: {selectedInventoryItem.description}</p>}
            <p className='view-item-price-details'>Purchased for <FaCoins className="coins-icon view-coins-icon" />{selectedInventoryItem.price} </p>

            {selectedInventoryItem.quantity > 1 && (
                <div className="quantity-container">
                    <label>Quantity:</label>
                    <input
                        type="number"
                        className="quantity-input"
                        min={1}
                        max={selectedInventoryItem.quantity}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                    />
                </div>
            )}

            <button className="command-button" onClick={handleUseReward} >Use</button>
        </Card>
    )
}