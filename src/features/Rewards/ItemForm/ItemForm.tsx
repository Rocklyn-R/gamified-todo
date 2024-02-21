import React, { useState } from "react";
import Card from "../../../components/Card/Card";
import "./ItemForm.css";
import { useDispatch, UseDispatch } from "react-redux";
import { addItemToShop } from "../../../store/RewardsSlice";
import { v4 as uuidv4 } from "uuid";

interface ItemFormProps {
    handleHideForm: () => void;
    isEditMode: boolean;
}

export const ItemForm: React.FC<ItemFormProps>  = ({ handleHideForm, isEditMode}) => {
    const dispatch = useDispatch();
    const [ name, setName ] = useState("");
    const [ price, setPrice ] = useState(0);
    const [ description, setDescription ] = useState("");



    const handleSubmitAddItem = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(addItemToShop({
            name: name,
            price: price,
            description: description,
            id: uuidv4()
        }))

        if(handleHideForm) {
           handleHideForm(); 
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmitAddItem}>


                <div className="add-task-form">
                    <button
                        type="button"
                        className='close'
                        onClick={handleHideForm}
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
                        Create item
                    </button>
                </div>


            </form>
        </Card>
    )
}