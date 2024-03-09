import React, { useState, useRef, useEffect } from "react";
import "./SettingsMobile.css";
import { useDispatch, useSelector } from "react-redux";
import {
    selectWorkMinutes,
    selectBreakMinutes,
    selectLongBreakMinutes,
    selectNumOfSessionsToLongBreak,
    selectWorkMinutesQueued,
    selectBreakMinutesQueued,
    selectLongBreakMinutesQueued,
    selectPomodoroPrice,
    setWorkMinutes,
    setBreakMinutes,
    setLongBreakMinutes,
    setNumOfSessionsToLongBreak,
    setSellingPrice
} from "../../../../store/PomodoroSlice";
import Card from "../../../../components/Card/Card";
import { NumberPicker } from "./NumberPicker/NumberPicker";

type ModeType = "work" | "break" | "longBreak" | "numOfSessions" | "tomatoPrice" | ""
interface ShowPickerState {
    show: boolean,
    mode: ModeType;
}

interface SettingsMobileProps {
    handleCloseSettings: () => void;
}

export const SettingsMobile: React.FC<SettingsMobileProps> = ({ handleCloseSettings }) => {
    const workMinutes = useSelector(selectWorkMinutes);
    const workMinutesQueued = useSelector(selectWorkMinutesQueued);
    const [workMinutesLocal, setWorkMinutesLocal] = useState(workMinutesQueued || workMinutes)

    const breakMinutes = useSelector(selectBreakMinutes);
    const breakMinutesQueued = useSelector(selectBreakMinutesQueued);
    const [breakMinutesLocal, setBreakMinutesLocal] = useState(breakMinutesQueued || breakMinutes);


    const longBreakMinutes = useSelector(selectLongBreakMinutes);
    const longBreakMinutesQueued = useSelector(selectLongBreakMinutesQueued);
    const [longBreakMinutesLocal, setLongBreakMinutesLocal] = useState(longBreakMinutesQueued || longBreakMinutes);


    const numOfSessionsToLongBreak = useSelector(selectNumOfSessionsToLongBreak);
    const [numOfSessionsToLongBreakLocal, setNumOfSessionsToLongBreakLocal] = useState(numOfSessionsToLongBreak);

    const pomodoroPrice = useSelector(selectPomodoroPrice);
    const [tomatoPriceLocal, setTomatoPriceLocal] = useState(pomodoroPrice)

    const [showPicker, setShowPicker] = useState<ShowPickerState>({ show: false, mode: "" });

    const overlayRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === overlayRef.current) {
            setShowPicker({ show: false, mode: "" })
        }
    };



    useEffect(() => {
        document.addEventListener('mousedown', handleOverlayClick);

        return () => {
            document.removeEventListener('mousedown', handleOverlayClick);
        };
    }, []);



    const updateSelectedValue = (value: number) => {

        switch (showPicker.mode) {
            case "work":
                setWorkMinutesLocal(value);
                break;
            case "break":
                setBreakMinutesLocal(value);
                break;
            case "longBreak":
                setLongBreakMinutesLocal(value);
                break;
            case "numOfSessions":
                setNumOfSessionsToLongBreakLocal(value);
                break;
            default:
                setTomatoPriceLocal(value);
                break;
        }
    }

    const hidePicker = () => {
        setShowPicker({ ...showPicker, show: false })
    }

    const selectValue = showPicker.mode === "work" ? workMinutesLocal
        : showPicker.mode === "break" ? breakMinutesLocal
            : showPicker.mode === "longBreak" ? longBreakMinutesLocal
                : showPicker.mode === "numOfSessions" ? numOfSessionsToLongBreakLocal
                    : tomatoPriceLocal;


    const handleChangeSettings = () => {
        dispatch(setWorkMinutes(workMinutesLocal));
        dispatch(setBreakMinutes(breakMinutesLocal));
        dispatch(setLongBreakMinutes(longBreakMinutesLocal));
        dispatch(setNumOfSessionsToLongBreak(numOfSessionsToLongBreakLocal));
        dispatch(setSellingPrice(tomatoPriceLocal));
        handleCloseSettings();
    }

    return (
        <>
            <Card className="pomodoro-mobile-settings">
                <h4>Pomodoro Settings</h4>
                <div className="pomodoro-settings-buttons">
                    <button onClick={() => setShowPicker({ show: true, mode: "work" })}>
                        <p>Work session duration:</p>
                        <p>{workMinutesLocal}</p>
                    </button>
                    <button onClick={() => setShowPicker({ show: true, mode: "break" })}>
                        <p>Short break duration:</p>
                        <p>{breakMinutesLocal}</p>
                    </button>
                    <button onClick={() => setShowPicker({ show: true, mode: "longBreak" })}>
                        <p>Long break duration:</p>
                        <p>{longBreakMinutesLocal}</p>
                    </button>
                    <button onClick={() => setShowPicker({ show: true, mode: "numOfSessions" })}>
                        <p>Num of sessions to long break:</p>
                        <p>{numOfSessionsToLongBreakLocal}</p>
                    </button>
                    <button onClick={() => setShowPicker({ show: true, mode: "tomatoPrice" })}>
                        <p>Selling price of tomato:</p>
                        <p>{tomatoPriceLocal}</p>
                    </button>
                </div>


                <div className="command-buttons-container pomodoro-settings-command-buttons">
                    <button className="command-button" onClick={handleCloseSettings}>Cancel</button>
                    <button className="command-button pomodoro-settings-done" onClick={handleChangeSettings}>Done</button>
                </div>
            </Card>

            {(showPicker.show) && (
                <div className="pomodoro-overlay" ref={overlayRef}>
                    <NumberPicker
                        mode={showPicker.mode}
                        updateValue={updateSelectedValue}
                        hidePicker={hidePicker}
                        selectValue={selectValue}
                    />
                </div>

            )}
        </>


    )

}