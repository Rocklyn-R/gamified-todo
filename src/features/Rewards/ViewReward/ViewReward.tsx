import React, { useState } from 'react';
import Card from '../../../components/Card/Card';
import "./ViewReward.css";
import { FaCoins, FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Reward } from '../../../types/Types';
import { ItemForm } from '../ItemForm/ItemForm';
import { DeleteMessage } from '../../../components/DeleteMessage/DeleteMessage';
import { buyItem, selectTotalCoins } from '../../../store/RewardsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { renderIcon } from '../../../utilities/utilities';

interface ViewRewardProps {
    selectedReward: Reward;
    handleHideReward: () => void;
}

export const ViewReward: React.FC<ViewRewardProps> = ({ selectedReward, handleHideReward }) => {

    const [editMode, setEditMode] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [purchaseFailed, setPurchaseFailed] = useState(false);
    const totalCoins = useSelector(selectTotalCoins);
    const dispatch = useDispatch();


    const handleEditReward = () => {
        setEditMode(true);
    }

    const handleCloseForm = () => {
        setEditMode(false);
    }

    const handleDeleteItem = () => {
        setShowDeleteMessage(true);
        setEditMode(true);
    }

    const hideDeleteMessage = () => {
        setShowDeleteMessage(false);
        setEditMode(false);
    }

    const handleBuyItem = () => {
        if (selectedReward.price > totalCoins) {
            setPurchaseFailed(true);
        } else {
            dispatch(buyItem(selectedReward));
            handleHideReward();
        }
    }

    return (
        <>
            {!editMode && (

                <Card className="view-rewards-container">
                    <button
                        className="close"
                        onClick={handleHideReward}
                    >
                        X
                    </button>
                    
                    <div className="edit-delete-buttons">

                        <button
                            className="edit-reward"
                            onClick={handleEditReward}
                        >
                            <FaRegEdit className="edit-reward-icon" /></button>


                        <button
                            className="delete-reward"
                            onClick={handleDeleteItem}
                        >
                            <MdDeleteOutline className='delete-reward-icon' />
                        </button>
                    </div>
                    <img src={renderIcon(selectedReward.icon)} height="40" width="40" />
                    <p className="reward-name">
                        Name: {selectedReward.name}
                    </p>
                    <p className='item-description'>
                        {selectedReward.description && `Description: ${selectedReward.description}`}
                    </p>
                    <p className='view-item-price-details'>
                        Price: <FaCoins className='coins-icon view-coins-icon' />{selectedReward.price}
                    </p>
                    {purchaseFailed && (
                        <p>You don't have enough coins to buy this item!</p>
                    )}
                    <button
                        className='command-button'
                        onClick={handleBuyItem}
                    >
                        Buy
                    </button>

                </Card>
            )}

            {editMode && showDeleteMessage && (
                <DeleteMessage
                    hideDeleteMessage={hideDeleteMessage}
                    selectedReward={selectedReward}
                    handleHideReward={handleHideReward}
                />
            )}

            {editMode && !showDeleteMessage && (
                <ItemForm
                    isEditMode={true}
                    handleCloseForm={handleCloseForm}
                    selectedReward={selectedReward}
                    handleHideReward={handleHideReward}
                />
            )}

        </>


    )
}