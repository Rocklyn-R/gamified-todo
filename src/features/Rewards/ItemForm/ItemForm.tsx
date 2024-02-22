import React, { useState, useEffect } from "react";
import Card from "../../../components/Card/Card";
import "./ItemForm.css";
import { useDispatch } from "react-redux";
import { addItemToShop } from "../../../store/RewardsSlice";
import { v4 as uuidv4 } from "uuid";
import { editItemInShop } from "../../../store/RewardsSlice";
import { identifier } from "@babel/types";
import { RewardItem } from "../RewardItem/RewardItem";
import { Reward } from "../../../types/Types";

interface ItemFormProps {
    handleCloseForm: () => void;
    isEditMode: boolean;
    selectedReward?: Reward;
    handleHideReward?: () => void;
}

export const ItemForm: React.FC<ItemFormProps>  = ({ handleCloseForm, isEditMode, selectedReward, handleHideReward}) => {
    const dispatch = useDispatch();
    const [ name, setName ] = useState("");
    const [ price, setPrice ] = useState(0);
    const [ description, setDescription ] = useState("");

    useEffect(() => {
        if (isEditMode && selectedReward) {
            setName(selectedReward.name);
            setPrice(selectedReward.price);
            setDescription(selectedReward.description);
        }
    }, [isEditMode, selectedReward]);


    const handleSubmitAddItem = (event: React.FormEvent<HTMLFormElement>) => {
        if (!isEditMode) {
             event.preventDefault();
        dispatch(addItemToShop({
            name: name,
            price: price,
            description: description,
            id: uuidv4()
        }))
        } else if (isEditMode && selectedReward && handleHideReward){
            dispatch(editItemInShop({
                name: name,
                price: price,
                description: description,
                id: selectedReward.id
            }))
            handleHideReward();
        }
       

        handleCloseForm();
    }

    return (
        <Card>
            <form onSubmit={handleSubmitAddItem}>


                <div className="add-task-form">
                    <button
                        type="button"
                        className='close'
                        onClick={handleCloseForm}
                    >
                        X
                    </button>
                    <div className='basic-box'>
                        <input
                            placeholder="Name"
                            id="item-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            placeholder='Price'
                            id="price"
                            type="number"
                            onChange={(e) => setPrice(parseInt(e.target.value))}
                        />
                        <input
                            placeholder="Description (optional)"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                </div>

                    <button type="submit" value="Submit" className="submit-task-button">
                        {isEditMode? "Edit item" : "Create item"}
                    </button>
                </div>


            </form>
        </Card>
    )
}