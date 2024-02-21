import React, {useState} from 'react';
import Card from '../../../components/Card/Card';
import "./ViewReward.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Reward } from '../../../types/Types';
import { ItemForm } from '../ItemForm/ItemForm';

interface ViewRewardProps {
    selectedReward: Reward;
    handleHideReward: () => void;
}

export const ViewReward: React.FC<ViewRewardProps> = ({ selectedReward, handleHideReward }) => {

    const [ editMode, setEditMode ] = useState(false);

    const handleEditReward = () => {
        setEditMode(true);
    }

    const handleHideForm = () => {
        setEditMode(false);
    }

    return (
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
                >
                    <MdDeleteOutline className='delete-reward-icon' />
                </button>
            </div>

            <p className="reward-name">
                Name: {selectedReward.name}
            </p>
            <p className='reward-description'>
                {selectedReward.description && `Notes: ${selectedReward.description}`}
            </p>
            <p>
                Price: {selectedReward.price}
            </p>

            <button className='buy-reward'>Buy</button>
           {editMode && 
                <ItemForm 
                    isEditMode={true}
                    handleHideForm={handleHideForm}
                />
            }

        </Card>
    )
}