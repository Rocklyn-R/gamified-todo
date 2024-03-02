import React, { useState } from "react";
import { FaCoins } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/Card/Card";
import { selectPomodoroPrice, selectPomodoros, sellPomodoros } from "../../../store/PomodoroSlice";
import "./PomodoroForm.css";
import tomato from "../../../images/tomato.png";
import { addToCoins } from "../../../store/RewardsSlice";

interface PomodoroFormProps {
    hideForm: () => void;
}


export const PomodoroForm: React.FC<PomodoroFormProps> = ({ hideForm }) => {
    const pomodoros = useSelector(selectPomodoros);
    const pomodoroPrice = useSelector(selectPomodoroPrice);
    const [numOfPomodoros, setNumOfPomodoros] = useState(pomodoros);
    const priceTotal = numOfPomodoros * pomodoroPrice;
    const dispatch = useDispatch();

    const confirmPomodoroSale = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (numOfPomodoros > 0) {
            dispatch(addToCoins(priceTotal));
            dispatch(sellPomodoros(numOfPomodoros));
        }
        hideForm();
    }


    return (
        <Card className="pomodoro-form-container">
            <form onSubmit={confirmPomodoroSale}>
                {numOfPomodoros > 0 && (
                    <>
                        <label>Sell:</label>

                        <div className="sell-label-input">
                            <img src={tomato} alt="" width="24" height="24" />
                            <input
                                type="number"
                                name="number"
                                min={numOfPomodoros > 0 ? 1 : 0}
                                max="5"
                                placeholder={numOfPomodoros.toString()}
                                value={numOfPomodoros}
                                onChange={(e) => setNumOfPomodoros(parseInt(e.target.value))}
                            />

                        </div>

                        <p>for <FaCoins className="coins-icon" />{priceTotal} </p>
                    </>
                )}
                {numOfPomodoros === 0 && (
                    <>
                        <p>Collect pomodoros to sell them for coins.</p>
                    </>
                )}
                <button type="submit" className="command-button">{numOfPomodoros > 0 ? "Sell" : "Ok"}</button>
            </form>
        </Card>
    )
}