import "./Timer.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { selectIsPaused, play, pause, tick, selectSecondsLeft } from "../../../store/PomodoroSlice";



export const Timer = () => {
    const dispatch = useDispatch();
    const isPaused = useSelector(selectIsPaused);
    const secondsLeft = useSelector(selectSecondsLeft);


   /* const initTimer = () => {
        //setSecondsLeft(settingsInfo.workMinutes * 60);
    }*/

   /* const switchMode = () => {
        const nextMode = mode === "work" ? "break" : "work";
        const nextSeconds = (nextMode === "work" ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60);
        setMode(nextMode);
        //setSecondsLeft(nextSeconds);
    }*/
   // let intervalId: NodeJS.Timeout | null = null;

    

    let isPausedBool = false; // Flag to track if the timer is paused
    let timerId: any; // Variable to hold the timer ID
    
    const pauseTimer = () => {
        dispatch(pause());
        isPausedBool = true; // Set the flag to pause the timer
        clearTimeout(timerId); // Clear the timeout to stop the timer
    };
    
    const playTimer = () => {
        dispatch(play());
        let iterations = 0;
        const maxIterations = secondsLeft; // Specify the maximum number of iterations
    
        const tickTimes = () => {
            if (!isPausedBool && iterations <= maxIterations) { // Check if timer is not paused
                dispatch(tick());
                iterations++;
                timerId = setTimeout(tickTimes, 1000); // Store the timer ID for clearing later
            }
        };
    
        tickTimes(); // Start the timer
    };

    /* useEffect(() => {
         initTimer();
         timerRef.current =  setInterval(() => {
             if (isPausedRef.current) {
                 return;
             }
             if (secondsLeftRef.current === 0) {
                 return switchMode();
             }
             tick();
         }, 1000) as unknown as number;
     
         return () => clearInterval(timerRef.current as number);
     }, []);*/

    //const totalSeconds = mode === "work" ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;
    // const percentage = Math.round(secondsLeft / totalSeconds) * 100

     const timeString = (): string => {
         let formattedSeconds = secondsLeft % 60;
         if (formattedSeconds < 10) {
             return `${Math.floor(secondsLeft / 60)}:0${formattedSeconds}`;
         } else {
             return `${Math.floor(secondsLeft / 60)}:${formattedSeconds}`;
         }
     }

     


    return (
        <div>
            <CircularProgressbar
                value={25}
                text={timeString()}
                styles={buildStyles({
                    textColor: "rgb(240,248,255)",
                    pathColor: "rgba(111,168,220)",
                    trailColor: "rgb(240,248,255)"
                })} />
            <div className="control-timer-buttons">
                {isPaused &&
                    <button
                        className="play-button"
                        onClick={playTimer}
                    >
                        <FaPlay className="control-icon" /></button>}
                {!isPaused && <button className="play-button" onClick={pauseTimer}><FaPause className="control-icon" /></button>}

            </div>

        </div>
    )
}