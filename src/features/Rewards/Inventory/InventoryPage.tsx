import React, { useState, useEffect, useRef } from "react";
import Card from "../../../components/Card/Card";
import "./InventoryPage.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";
import { selectTotalCoins, selectInventory } from "../../../store/RewardsSlice";
import { useSelector } from "react-redux";
import { RewardItem } from "../RewardItem/RewardItem";
import { ViewReward } from "../ViewReward/ViewReward";
import { ViewInventoryItem } from "./ViewInventoryItem/ViewInventoryItem";
import { Reward } from "../../../types/Types";
import { GrHistory } from "react-icons/gr";

export const InventoryPage = () => {
    const totalCoins = useSelector(selectTotalCoins);
    const inventory = useSelector(selectInventory);
    const [ showItemDetails, setShowItemDetails ] = useState(false);
    const [ selectedInventoryItem, setSelectedInventoryItem ] = useState({
        name: "",
        price: 0,
        description: "",
        id: ""
    })

    const [ showHistory, setShowHistory ] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);
    
    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === overlayRef.current) {
            setShowItemDetails(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOverlayClick);

        return () => {
            document.removeEventListener('mousedown', handleOverlayClick);
        };
    }, []);
    

    const hideInventoryItem = () => {
        setShowItemDetails(false);
    }


    const handleViewInventoryItem = (item: Reward) => {
        setShowItemDetails(true);
        setSelectedInventoryItem(item)
    }

    return (
        <div className="rewards-container">
        <Link to="../rewards"><IoArrowBackOutline className="back-icon" /></Link>
        <div className='inventory-history-icon'>
            <Link to="/rewards/inventory/history" ><GrHistory className='history-icon' /></Link>
        </div>
        <div className="coin-count-header">
                <h1><FaCoins className='coin-icon' /> {totalCoins}</h1>
            </div>
         <Card className="inventory-container">
            <h1>Inventory</h1>
            {inventory.map((item, index) => (
                <RewardItem 
                    key={index}
                    index={index}
                    reward={item}
                    handleViewReward={handleViewInventoryItem}
                />
            ))}

            {showItemDetails && (
                 <div className='overlay' ref={overlayRef}>
                    <ViewInventoryItem 
                        selectedInventoryItem={selectedInventoryItem}
                        hideInventoryItem={hideInventoryItem}
                    />
                </div>
            )}
        </Card>
        </div>
       
    )
}