import "./OverdueTasks.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTasks } from "../../../store/TasksSlice";
import { Task } from "../../../types/Types";
import { IoIosArrowDown } from "react-icons/io";
import Card from "../../../components/Card/Card";
import { selectOverdueTasks } from "../../../store/TasksSlice";
import { TaskItem } from "../TaskItem/TaskItem";
import { subtractCoins } from "../../../store/RewardsSlice";
import { moveOverdueToHistory } from "../../../store/TasksSlice";

export const OverdueTasks = () => {

    const tasks = useSelector(selectTasks);
    const [showOverdueTasks, setShowOverdueTasks] = useState(false);
    const overdueTasks = useSelector(selectOverdueTasks);
    const dispatch = useDispatch()

    const numOfOverdueTasks = (tasks: Task[]) => {
        // If tasks array is empty, return 0
        if (tasks.length === 0) {
            return 0;
        }

        // Otherwise, count the number of tasks with overdue: true
        return tasks.reduce((count, task) => {
            return count + (task.overdue ? 1 : 0);
        }, 0);
    };


    const handleAcceptPenalty = () => {
        overdueTasks.forEach(task => {
            dispatch(subtractCoins(task.coinPenalty));
            dispatch(moveOverdueToHistory(task));
        })
    }



    return (
        <Card className="overdue-container">
            {overdueTasks.map((task, index) => {
                return <TaskItem task={task} index={index}
                />
            })}
            <button 
            className="command-button accept-penalty"
            onClick={handleAcceptPenalty}
            >Ok</button>
        </Card>
    )
}