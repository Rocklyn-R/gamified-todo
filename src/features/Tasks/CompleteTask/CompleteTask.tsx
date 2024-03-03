import React, { useState } from 'react';
import './CompleteTask.css';
import { useDispatch } from 'react-redux';
import { Task } from '../../../types/Types';
import { completeTask } from '../../../store/TasksSlice';
import { addToCoins } from '../../../store/RewardsSlice';
import { completeOverdueTask } from '../../../store/TasksSlice';

interface CompleteTaskProps {
    task: Task
}

export const CompleteTask: React.FC<CompleteTaskProps> = ({ task }) => {
    const [isChecked, setIsChecked] = useState(false);

    const dispatch = useDispatch();


    const handleCompleteTask = () => {
        setIsChecked(!isChecked);
        console.log(task);
        setTimeout(() => {
            if (!task.overdue) {
                dispatch(completeTask(task));
                dispatch(addToCoins(task.coinReward));
            } else {
                dispatch(completeOverdueTask(task));
                dispatch(addToCoins(task.coinReward));
            }
            setIsChecked(false);
        }, 800)

    }

    return (
        <label className={task.overdue ? "custom-checkbox-overdue" : "custom-checkbox"}>
            <input type="checkbox" checked={isChecked} onChange={handleCompleteTask} />
            <span className={task.overdue ? "checkmark-overdue" : "checkmark"}></span>
        </label>
    )
}