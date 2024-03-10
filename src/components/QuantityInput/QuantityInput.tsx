import React from "react";
import "./QuantityInput.css";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";


interface QuantityInputProps {
    quantity: number;
    setQuantity: (quantity: number) => void;
    maxQuantity?: number;
}

export const QuantityInput: React.FC<QuantityInputProps> = ({quantity, setQuantity, maxQuantity}) => {


    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const handleIncrement = () => {
        if (maxQuantity) {
             if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
        }
        } else {
            setQuantity(quantity + 1)
        }
       
    }

    const minQuantityReached: boolean = quantity === 1;

    const maxQuantityReached: boolean = quantity === maxQuantity

    return (
        <div className="quantity-input-container">
            <label>Quantity:</label>
            <div className="input-with-buttons">
                <button className={minQuantityReached ? "min-reached" : ""} id="decrement-button" onClick={handleDecrement}>
                    <FiMinus />
                </button>
                <input 
                 type="number"
                 name="quantity"
                 min={1}
                 max={maxQuantity} 
                 value={quantity}
                 onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            />
            <button className={maxQuantityReached ? "max-reached" : ""} onClick={handleIncrement}>
                <FiPlus />
                </button>
            </div>
            

        </div>
    )
}