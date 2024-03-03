import "./PomodoroPage.css";
import React, { useState, useRef, useEffect } from "react";
import Card from "../../components/Card/Card";
import { Timer } from "./Timer/Timer";
import { IoIosSettings } from "react-icons/io";
import { Settings } from "./Settings/Settings";
import { useSelector } from "react-redux";
import { selectIsPaused, selectSessionsRemaining } from "../../store/PomodoroSlice";
import { PomodoroForm } from "./PomodoroForm/PomodoroForm";
import { FaCoins } from "react-icons/fa";
import { selectTotalCoins } from "../../store/RewardsSlice";

export const PomodoroPage = () => {
    const [showSettings, setShowSettings] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const isPaused = useSelector(selectIsPaused);
    const [showSellPomodoros, setShowSellPomodoros] = useState(false);
    const sessionsRemaining = useSelector(selectSessionsRemaining);
    const totalCoins = useSelector(selectTotalCoins);


    const handleOpenSettings = () => {
        setShowSettings(true);
    }

    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === overlayRef.current) {
            setShowSettings(false);
            setShowSellPomodoros(false);
        }
    };



    useEffect(() => {
        document.addEventListener('mousedown', handleOverlayClick);

        return () => {
            document.removeEventListener('mousedown', handleOverlayClick);
        };
    }, []);

    const handleCloseSettings = () => {
        setShowSettings(false);
    }


    const handleShowSellPomodoros = () => {
        setShowSellPomodoros(true);
    }

    const hideShowSellPomodoros = () => {
        setShowSellPomodoros(false);
    }

    return (

        <Card className="pomodoro-container">
            <h1>POMODORO TIMER</h1>
            <div className="coin-count-header">
                    <h1><FaCoins className='coin-icon' /> {totalCoins}</h1>
                </div>
            {isPaused && (
                <button
                    className="settings-button"
                    onClick={handleOpenSettings}
                >
                    <IoIosSettings className="settings-icon" /></button>
            )}


            <Timer handleShowSellPomodoros={handleShowSellPomodoros} />
            {showSettings && (
                <div className="overlay" ref={overlayRef}>
                    <Settings handleCloseSettings={handleCloseSettings} />
                </div>
            )}

            {showSellPomodoros && (
                <div className="overlay" ref={overlayRef}>
                    <PomodoroForm hideForm={hideShowSellPomodoros} />
                </div>
            )}
            <p id="sessions-remaining">{sessionsRemaining > 0 && `${sessionsRemaining} work sessions before long break`}</p>
        </Card>
    )
}