import "./Settings.css";
import Card from "../../../components/Card/Card";
import ReactSlider from "react-slider";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectWorkMinutes, selectBreakMinutes } from "../../../store/PomodoroSlice";
import { useDispatch } from "react-redux";
import { setWorkMinutes, setBreakMinutes } from "../../../store/PomodoroSlice";

interface SettingsProps {
    handleCloseSettings: () => void;
}

export const Settings: React.FC<SettingsProps> = ({handleCloseSettings}) => {
    const workMinutes = useSelector(selectWorkMinutes);
    const breakMinutes = useSelector(selectBreakMinutes);
    const [workMinutesLocal, setWorkMinutesLocal] = useState(workMinutes);
    const [breakMinutesLocal, setBreakMinutesLocal] = useState(breakMinutes);
    const dispatch = useDispatch();

    const handleChangeSettings = () => {
        dispatch(setWorkMinutes(workMinutesLocal));
        dispatch(setBreakMinutes(breakMinutesLocal));
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
            <button className="command-button" onClick={handleChangeSettings}>Done</button>
        </Card>
    )
}