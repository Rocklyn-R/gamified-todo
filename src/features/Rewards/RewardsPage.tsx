import React, { useState, useRef, useEffect } from 'react';
import "./RewardsPage.css";
import Card from "../../components/Card/Card";
import { selectTotalCoins, selectItemsInShop } from '../../store/RewardsSlice';
import { useSelector } from 'react-redux';
import { FaCoins } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ItemForm } from './ItemForm/ItemForm';
import { RewardItem } from './RewardItem/RewardItem';
import { ViewReward } from './ViewReward/ViewReward';
import { Reward } from '../../types/Types';


export const RewardsPage = () => {
    const totalCoins = useSelector(selectTotalCoins);
    const [showForm, setShowForm] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const shopItems = useSelector(selectItemsInShop);
    const [showReward, setShowReward] = useState(false);
    const [selectedReward, setSelectedReward] = useState({
        name: "",
        price: 0,
        description: "",
        id: ""
    })

    const handleAddNewItem = () => {
        setShowForm(true);
    }

    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === overlayRef.current) {
            setShowForm(false);
            setShowReward(false);
        }
    };


    useEffect(() => {
        document.addEventListener('mousedown', handleOverlayClick);

        return () => {
            document.removeEventListener('mousedown', handleOverlayClick);
        };
    }, []);

    const handleViewReward = (reward: Reward) => {
        setShowReward(true);
        setSelectedReward(reward);
    }

    const handleHideReward = () => {
        setShowReward(false);
    }

    const handleCloseForm = () => {
        setShowForm(false);
    }


    return (
        <>

            <div className='rewards-container'>
                <div className="coin-count-header">
                    <h1><FaCoins className='coin-icon' /> {totalCoins}</h1>
                </div>
                <Card className="rewards-box">
                    <h1>Rewards Shop:</h1>
                    {shopItems.map((item, index) =>
                        <RewardItem reward={item} index={index} handleViewReward={handleViewReward} inventory={false} />
                    )}

                    {showForm && (
                        <div className="overlay" ref={overlayRef}>
                            <ItemForm
                                handleCloseForm={handleCloseForm}
                                isEditMode={false}
                            />
                        </div>
                    )
                    }

                    {showReward && (
                        <div className='overlay' ref={overlayRef}>
                            <ViewReward
                                selectedReward={selectedReward}
                                handleHideReward={handleHideReward}
                            />
                        </div>
                    )
                    }

                </Card>
                <div className="add-reward">
                    <button onClick={() => handleAddNewItem()}><IoIosAddCircleOutline /></button>
                </div>
            </div>
        </>


    )
}