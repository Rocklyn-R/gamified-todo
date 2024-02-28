import "./PomodoroPage.css";
import React, { useState, useRef, useEffect } from "react";
import Card from "../../components/Card/Card";
import { Timer } from "./Timer/Timer";
import { IoIosSettings } from "react-icons/io";
import { Settings } from "./Settings/Settings";
import { SettingsContext } from "./Settings/SettingsContext/SettingsContext";
import tomato from "../../images/tomato.png"
import { useSelector } from "react-redux";
import { selectPomodoros } from "../../store/PomodoroSlice";

export const PomodoroPage = () => {
    const [showSettings, setShowSettings] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [workMinutes, setWorkMinutes] = useState(25);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const pomodoros = useSelector(selectPomodoros);


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

    return (

        <Card className="pomodoro-container">
            <h1>Pomodoro Timer</h1>
            <button
                className="settings-button"
                onClick={handleOpenSettings}
            >
                <IoIosSettings className="settings-icon" /></button>

            <SettingsContext.Provider value={{
                workMinutes: workMinutes,
                breakMinutes: breakMinutes,
                setWorkMinutes: setWorkMinutes,
                setBreakMinutes: setBreakMinutes
            }}>
                <Timer />
                {showSettings && (
                    <div className="overlay" ref={overlayRef}>
                        <Settings handleCloseSettings={handleCloseSettings} />
                    </div>
                )}
                <button className="pomodoro-button"><img alt="" src={tomato} className="pomodoro-icon" height="30" width="30" /></button>
                <p>Total: {pomodoros}</p>

            </SettingsContext.Provider>

        </Card>
    )
}