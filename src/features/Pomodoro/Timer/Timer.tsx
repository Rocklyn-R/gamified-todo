import "./Timer.css";
import React, { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { FaStop } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
    selectIsPaused,
    play,
    pause,
    tick,
    selectSecondsLeft,
    selectWorkMinutes,
    selectBreakMinutes,
    selectMode,
    reset,
    skip,
    selectLongBreakMinutes,
    selectPomodoros
} from "../../../store/PomodoroSlice";
import { BsFillSkipEndFill } from "react-icons/bs";
import tomato from "../../../images/tomato.png";


let intervalId: any = null;

interface TimerProps {
    handleShowSellPomodoros: () => void;
}

export const Timer: React.FC<TimerProps> = ({ handleShowSellPomodoros }) => {
    const dispatch = useDispatch();
    const isPaused = useSelector(selectIsPaused);
    const mode = useSelector(selectMode);
    const secondsLeft = useSelector(selectSecondsLeft);
    const workMinutes = useSelector(selectWorkMinutes);
    const breakMinutes = useSelector(selectBreakMinutes);
    const longBreakMinutes = useSelector(selectLongBreakMinutes);
    const pomodoros = useSelector(selectPomodoros);



    useEffect(() => {

        if (isPaused) {
            clearInterval(intervalId);
        }

    }, [isPaused]);




    const pauseTimer = () => {
        dispatch(pause());
    };

    const startTimer = () => {
        let iterations = 0;
        const maxIterations = secondsLeft;
        const id = setInterval(() => {
            if (iterations <= maxIterations) {
                dispatch(tick());
                iterations++;
            } else {
                intervalId = id;
            }
        }, 1000);
        intervalId = id;
    };




    const playTimer = () => {
        dispatch(play());
        startTimer();
    }

    const resetTimer = () => {
        dispatch(reset());
    }

    const skipTimer = () => {
        dispatch(skip());
    }



    const totalSeconds = mode === "work" ? workMinutes * 60 : mode === "break" ? breakMinutes * 60 : longBreakMinutes * 60;
    const percentage = (secondsLeft / totalSeconds) * 100;

    const timeString = (): string => {
        let formattedSeconds = secondsLeft % 60;
        if (formattedSeconds < 10) {
            return `${Math.floor(secondsLeft / 60)}:0${formattedSeconds}`;
        } else {
            return `${Math.floor(secondsLeft / 60)}:${formattedSeconds}`;
        }
    }


    const modeString = mode === "work" ? "Work Session" : mode === "break" ? "Break" : "Long Break";

    return (
        <div className="circular-progressbar-wrapper">
            <CircularProgressbar
                value={percentage}
                text={timeString()}
                styles={buildStyles({
                    textColor: "rgb(240,248,255)",
                    pathColor: "rgba(111,168,220)",
                    trailColor: "rgb(240,248,255)"
                })} />
            <p id="mode-string">{modeString}</p>
            <button className="pomodoro-button" onClick={handleShowSellPomodoros}>
                <img alt="" src={tomato} className="pomodoro-icon" height="30" width="30" />
                <p>{pomodoros}</p>
            </button>
            <div className="control-timer-buttons">
                <button
                    className="play-button"
                    onClick={resetTimer}
                ><FaStop className="control-icon" /></button>
                {isPaused &&
                    <button
                        className="play-button"
                        onClick={playTimer}
                    >
                        <FaPlay className="control-icon" /></button>}
                {!isPaused && <button className="play-button" onClick={pauseTimer}><FaPause className="control-icon" /></button>}
                <button
                    className="play-button"
                    onClick={skipTimer}
                ><BsFillSkipEndFill className="play-button" /></button>
            </div>

        </div>
    )
}