import "./OverdueTasks.css";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../../components/Card/Card";
import { selectOverdueTasks } from "../../../store/TasksSlice";
import { TaskItem } from "../TaskItem/TaskItem";
import { subtractCoins } from "../../../store/RewardsSlice";
import { moveOverdueToHistory } from "../../../store/TasksSlice";

export const OverdueTasks = () => {

    const overdueTasks = useSelector(selectOverdueTasks);
    const dispatch = useDispatch();

    
    const handleAcceptPenalty = () => {
        overdueTasks.forEach(task => {
            dispatch(subtractCoins(task.coinPenalty));
            dispatch(moveOverdueToHistory(task));
        })
    }



    return (
        <Card className="overdue-container overlay-card">
            <h1 id="overdue-tasks-heading">OVERDUE TASKS</h1>
            {overdueTasks.map((task, index) => {
                return <TaskItem task={task} index={index} overdue={true}
                />
            })}
            <button 
            className="command-button accept-penalty"
            onClick={handleAcceptPenalty}
            >Ok</button>
        </Card>
    )
}