import "./Settings.css";
import Card from "../../../components/Card/Card";
import ReactSlider from "react-slider";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectWorkMinutes, 
    selectBreakMinutes, 
    selectPomodoroPrice, 
    selectLongBreakMinutes, 
    selectNumOfSessionsToLongBreak, 
    setLongBreakMinutes, 
    setNumOfSessionsToLongBreak,
    selectWorkMinutesQueued,
    selectBreakMinutesQueued,
    selectLongBreakMinutesQueued 
} from "../../../store/PomodoroSlice";
import { useDispatch } from "react-redux";
import { setWorkMinutes, setBreakMinutes, setSellingPrice } from "../../../store/PomodoroSlice";
import { FaCoins } from "react-icons/fa";
import Picker from "react-mobile-picker";

interface SettingsProps {
    handleCloseSettings: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ handleCloseSettings }) => {
    const workMinutes = useSelector(selectWorkMinutes);
    const breakMinutes = useSelector(selectBreakMinutes);
    const longBreakMinutes = useSelector(selectLongBreakMinutes);
    const numOfSessionsToLongBreak = useSelector(selectNumOfSessionsToLongBreak);
    const workMinutesQueued = useSelector(selectWorkMinutesQueued);
    const breakMinutesQueued = useSelector(selectBreakMinutesQueued);
    const longBreakMinutesQueued = useSelector(selectLongBreakMinutesQueued);

    const [workMinutesLocal, setWorkMinutesLocal] = useState(workMinutesQueued || workMinutes);
    const [breakMinutesLocal, setBreakMinutesLocal] = useState(breakMinutesQueued || breakMinutes);
    const [longBreakMinutesLocal, setLongBreakMinutesLocal] = useState(longBreakMinutesQueued || longBreakMinutes);
    const [numOfSessionsToLongBreakLocal, setNumOfSessionsToLongBreakLocal] = useState(numOfSessionsToLongBreak);
    const pomodoroPrice = useSelector(selectPomodoroPrice);
    const [priceOfTomato, setPriceOfTomato] = useState(pomodoroPrice);


    const dispatch = useDispatch();

    const handleChangeSettings = () => {
        dispatch(setWorkMinutes(workMinutesLocal));
        dispatch(setBreakMinutes(breakMinutesLocal));
        dispatch(setLongBreakMinutes(longBreakMinutesLocal));
        dispatch(setNumOfSessionsToLongBreak(numOfSessionsToLongBreakLocal));
        dispatch(setSellingPrice(priceOfTomato));
        handleCloseSettings();
    }

    const handleCancel = () => {
        handleCloseSettings();
    }

    const [breakMinutesPickerValue, setPickerValue] = useState({
        "breakMinutes": String(breakMinutesLocal)
    })

    const numberSelectionTo120 = Array.from({ length: 120 }, (_, i) => i + 1);

    return (
        <Card className="pomodoro-settings-container overlay-card">
            <label>Work session duration: {workMinutesLocal} minutes</label>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={workMinutesLocal}
                onChange={newValue => setWorkMinutesLocal(newValue)}
                min={1}
                max={120}
            />
            <label>Short break duration: {breakMinutesLocal} minutes</label>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={breakMinutesLocal}
                onChange={newValue => setBreakMinutesLocal(newValue)}
                min={1}
                max={120}
            />
            <label>Long break duration: {longBreakMinutesLocal} minutes</label>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={longBreakMinutesLocal}
                onChange={newValue => setLongBreakMinutesLocal(newValue)}
                min={1}
                max={120}
            />
            <label>Work sessions until long break: {numOfSessionsToLongBreakLocal} sessions</label>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={numOfSessionsToLongBreakLocal}
                onChange={newValue => setNumOfSessionsToLongBreakLocal(newValue)}
                min={1}
                max={10}
            />
            <label><p id="tomato-selling-price">Selling price of 1 tomato: <FaCoins className="coins-icon" />{priceOfTomato}</p></label>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={priceOfTomato}
                onChange={newValue => setPriceOfTomato(newValue)}
                min={1}
                max={100}
            />
            <div className="command-buttons-container">
                <button className="command-button" onClick={handleCancel}>Cancel</button>
                <button className="command-button pomodoro-settings-done" onClick={handleChangeSettings}>Done</button>
            </div>

        </Card>
    )
}