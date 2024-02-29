import "./PomodoroPage.css";
import React, { useState, useRef, useEffect } from "react";
import Card from "../../components/Card/Card";
import { Timer } from "./Timer/Timer";
import { IoIosSettings } from "react-icons/io";
import { Settings } from "./Settings/Settings";
import tomato from "../../images/pomodoro.png";
import { useSelector } from "react-redux";
import { selectIsPaused, selectMode, selectPomodoros } from "../../store/PomodoroSlice";

export const PomodoroPage = () => {
    const [showSettings, setShowSettings] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const pomodoros = useSelector(selectPomodoros);
    const isPaused = useSelector(selectIsPaused);
    const mode = useSelector(selectMode);


    const handleOpenSettings = () => {
        setShowSettings(true);
    }

    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === overlayRef.current) {
            setShowSettings(false);
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

    const modeString = mode === "work" ? "Work Session" : "Break Session"

    return (

        <Card className="pomodoro-container">
            <h1>POMODORO TIMER</h1>
            {isPaused && (
                  <button
                className="settings-button"
                onClick={handleOpenSettings}
            >
                <IoIosSettings className="settings-icon" /></button>
            )}
          

                <Timer />
                {showSettings && (
                    <div className="overlay" ref={overlayRef}>
                        <Settings handleCloseSettings={handleCloseSettings} />
                    </div>
                )}
                <button className="pomodoro-button">
                <img alt="" src={tomato} className="pomodoro-icon" height="30" width="30" />
                <p>{pomodoros}</p>
                </button>
                    <p id="mode-string">{modeString}</p>
        </Card>
    )
}