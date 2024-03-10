import React, { useState, useEffect } from "react";
import Card from "../../../components/Card/Card";
import "./ItemForm.css";
import { useDispatch } from "react-redux";
import { addItemToShop } from "../../../store/RewardsSlice";
import { v4 as uuidv4 } from "uuid";
import { editItemInShop } from "../../../store/RewardsSlice";
import { Reward } from "../../../types/Types";
import movie from "../../../images/movie.png";
import videoGame from "../../../images/video-game.png";
import plane from "../../../images/plane.png";
import shopping from "../../../images/shopping.png";
import couch from "../../../images/couch.png";
import book from "../../../images/book.png";
import artist from "../../../images/artist.png";
import cocktail from "../../../images/cocktail.png";
import beauty from "../../../images/lipstick.png";
import music from "../../../images/music.png";
import phone from "../../../images/phone.png";
import gym from "../../../images/gym.png"
import sports from "../../../images/sports.png";
import nature from "../../../images/nature.png";
import headphones from "../../../images/headphones.png";
import money from "../../../images/money.png";
import love from "../../../images/love.png";
import gift from "../../../images/gift.png";
import { TextField } from "@mui/material";


interface ItemFormProps {
    handleCloseForm: () => void;
    isEditMode: boolean;
    selectedReward?: Reward;
    handleHideReward?: () => void;
}

export const ItemForm: React.FC<ItemFormProps> = ({ handleCloseForm, isEditMode, selectedReward, handleHideReward }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");

    useEffect(() => {
        if (isEditMode && selectedReward) {
            setName(selectedReward.name);
            setPrice(selectedReward.price);
            setDescription(selectedReward.description);
            setSelectedIcon(selectedReward.icon);
        }
    }, [isEditMode, selectedReward]);


    const handleIconSelection = (icon: string) => {
        setSelectedIcon(icon);
    }


    const handleSubmitAddItem = (event: React.FormEvent<HTMLFormElement>) => {
        if (!isEditMode) {
            event.preventDefault();
            dispatch(addItemToShop({
                name: name,
                price: price,
                description: description,
                id: uuidv4(),
                icon: selectedIcon

            }))
        } else if (isEditMode && selectedReward && handleHideReward) {
            dispatch(editItemInShop({
                name: name,
                price: price,
                description: description,
                id: selectedReward.id,
                icon: selectedIcon
            }))
            handleHideReward();
        }


        handleCloseForm();
    }


    return (
        <Card className="reward-form-container overlay-card">
            <form onSubmit={handleSubmitAddItem} autoComplete="off">
                <button
                    type="button"
                    className='close'
                    onClick={handleCloseForm}
                >
                    X
                </button>
                <h4>Create reward</h4>
                <TextField
                    type="text"
                    name="name"
                    label="Name" // MUI TextField uses a label prop instead of placeholder for floating label text
                    variant="outlined" // You can choose "filled" or "standard" as well, depending on your design preference
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    sx={{
                        width: '100%',
                        marginTop: "1rem",
                        marginBottom: '20px',
                        color: "#0c3d63" // Using the sx prop to apply margin
                    }}
                    inputProps={{
                        autoComplete: "off"
                    }}
                />
                <TextField
                    type="text"
                    name="description"
                    label="Description" // MUI TextField uses a label prop instead of placeholder for floating label text
                    variant="outlined" // You can choose "filled" or "standard" as well, depending on your design preference
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{
                        width: '100%',
                        marginTop: "1rem",
                        marginBottom: '20px',
                        color: "#0c3d63" // Using the sx prop to apply margin
                    }}
                    inputProps={{
                        autoComplete: "off"
                    }}
                />
                <TextField
                    label="Price" // MUI TextField uses a label prop instead of placeholder for floating label text
                    variant="outlined" // You can choose "filled" or "standard" as well, depending on your design preference
                    value={price}
                    type="number"
                    onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                    sx={{
                        width: '100%',
                        marginTop: "1rem",
                        marginBottom: '20px',
                        color: "#0c3d63" // Using the sx prop to apply margin
                    }}
                    InputProps={{
                        autoComplete: 'off', // More specific to potentially improve browser compliance
                      }}
                />
                <label>Select icon:</label>
                <div className="icon-choices">

                    <button
                        type="button"
                        onClick={() => handleIconSelection("movie")}
                        className={selectedIcon === "movie" ? "selected" : ""}
                    >
                        <img src={movie} height="30" width="30" alt="" /></button>
                    <button
                        type="button"
                        onClick={() => handleIconSelection("videoGame")}
                        className={selectedIcon === "videoGame" ? "selected" : ""}
                    >
                        <img src={videoGame} height="30" alt="" /></button>
                    <button
                        type="button"
                        onClick={() => handleIconSelection("shopping")}
                        className={selectedIcon === "shopping" ? "selected" : ""}
                    >
                        <img src={shopping} height="30" alt="" /></button>
                    <button
                        type="button"
                        onClick={() => handleIconSelection("plane")}
                        className={selectedIcon === "plane" ? "selected" : ""}
                    >
                        <img src={plane} height="30" alt="" /></button>
                    <button
                        type="button"
                        onClick={() => handleIconSelection("book")}
                        className={selectedIcon === "book" ? "selected" : ""}
                    >
                        <img src={book} height="30" alt="" /></button>
                    <button
                        type="button"
                        onClick={() => handleIconSelection("couch")}
                        className={selectedIcon === "couch" ? "selected" : ""}
                    >
                        <img src={couch} height="30" alt="" /></button>
                    <button
                        type="button"
                        onClick={() => handleIconSelection("artist")}
                        className={selectedIcon === "artist" ? "selected" : ""}
                    >
                        <img src={artist} height="30" alt="" /></button>
                    <button
                        type="button"
                        onClick={() => handleIconSelection("cocktail")}
                        className={selectedIcon === "cocktail" ? "selected" : ""}
                    >
                        <img src={cocktail} height="30" alt="" /></button>
                    <button
                        type="button"
                        onClick={() => handleIconSelection("beauty")}
                        className={selectedIcon === "beauty" ? "selected" : ""}
                    >
                        <img src={beauty} height="30" alt="" /></button>
                    <button
                        type="button"
                        onClick={() => handleIconSelection("music")}
                        className={selectedIcon === "music" ? "selected" : ""}

                    >
                        <img src={music} height="30" alt="" /></button>
                    <button
                        type="button"
                        onClick={() => handleIconSelection("phone")}
                        className={selectedIcon === "phone" ? "selected" : ""}
                    >
                        <img src={phone} height="30" alt="" /></button>
                    <button
                        type="button"
                        onClick={() => handleIconSelection("gym")}
                        className={selectedIcon === "gym" ? "selected" : ""}
                    >
                        <img src={gym} height="30" alt="" /></button>
                    <button
                        type="button"
                        onClick={() => handleIconSelection("sports")}
                        className={selectedIcon === "sports" ? "selected" : ""}
                    >
                        <img src={sports} height="30" alt="" /></button>
                    <button
                        type="button"
                        onClick={() => handleIconSelection("nature")}
                        className={selectedIcon === "nature" ? "selected" : ""}
                    >
                        <img src={nature} height="30" alt="" /></button>
                    <button
                        type="button"
                        onClick={() => handleIconSelection("headphones")}
                        className={selectedIcon === "headphones" ? "selected" : ""}
                    >
                        <img src={headphones} height="30" alt="" /></button>
                    <button
                        type="button"
                        onClick={() => handleIconSelection("money")}
                        className={selectedIcon === "money" ? "selected" : ""}
                    >
                        <img src={money} height="30" alt="" /></button>
                    <button
                        type="button"
                        onClick={() => handleIconSelection("love")}
                        className={selectedIcon === "love" ? "selected" : ""}
                    >
                        <img src={love} height="30" alt="" /></button>
                    <button
                        type="button"
                        onClick={() => handleIconSelection("gift")}
                        className={selectedIcon === "gift" ? "selected" : ""}
                    >
                        <img src={gift} height="30" alt="" /></button>
                </div>

                <button type="submit" value="Submit" className="command-button">
                    {isEditMode ? "Done editing" : "Create item"}
                </button>


            </form>
        </Card>
    )
}