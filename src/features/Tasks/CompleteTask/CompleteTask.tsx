import React, { useState } from 'react';
import './CompleteTask.css';
import { useDispatch } from 'react-redux';
import { Task } from '../../../types/Types';
import { completeTask } from '../../../store/TasksSlice';

interface CompleteTaskProps {
    task: Task
}

export const CompleteTask: React.FC<CompleteTaskProps> = ({ task }) => {
    const [isChecked, setIsChecked] = useState(false);

    const dispatch = useDispatch();


    const handleCompleteTask = () => {
        setIsChecked(!isChecked);

        setTimeout(() => {
           dispatch(completeTask(task)); 
           setIsChecked(false);
        }, 800)
        
    }

    return (
        <label className="custom-checkbox">
            <input type="checkbox" checked={isChecked} onChange={handleCompleteTask} />
            <span className="checkmark"></span>
        </label>
    )
}