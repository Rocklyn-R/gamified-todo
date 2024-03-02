import "./Settings.css";
import Card from "../../../components/Card/Card";
import ReactSlider from "react-slider";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectWorkMinutes, selectBreakMinutes, selectPomodoroPrice } from "../../../store/PomodoroSlice";
import { useDispatch } from "react-redux";
import { setWorkMinutes, setBreakMinutes, setSellingPrice } from "../../../store/PomodoroSlice";
import { FaCoins } from "react-icons/fa";

interface SettingsProps {
    handleCloseSettings: () => void;
}

export const Settings: React.FC<SettingsProps> = ({handleCloseSettings}) => {
    const workMinutes = useSelector(selectWorkMinutes);
    const breakMinutes = useSelector(selectBreakMinutes);
    const [workMinutesLocal, setWorkMinutesLocal] = useState(workMinutes);
    const [breakMinutesLocal, setBreakMinutesLocal] = useState(breakMinutes);
    const pomodoroPrice = useSelector(selectPomodoroPrice);
    const [priceOfTomato, setPriceOfTomato] = useState(pomodoroPrice);


    const dispatch = useDispatch();

    const handleChangeSettings = () => {
        dispatch(setWorkMinutes(workMinutesLocal));
        dispatch(setBreakMinutes(breakMinutesLocal));
        dispatch(setSellingPrice(priceOfTomato));
        handleCloseSettings();
    }
    
    return (
        <Card className="pomodoro-settings-container">
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
            <label>Long break duration:</label>
            <label>Work sessions until long break:</label>
            <label>Selling price of 1 tomato: <FaCoins className="coins-icon" />{priceOfTomato}</label>
            <ReactSlider 
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={priceOfTomato}
                onChange={newValue => setPriceOfTomato(newValue)}
                min={1}
                max={100}
            />
            <button className="command-button" onClick={handleChangeSettings}>Done</button>
        </Card>
    )
}