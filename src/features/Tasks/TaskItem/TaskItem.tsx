import React from 'react';
import { Task } from '../../../types/Types';
import { CompleteTask } from '../CompleteTask/CompleteTask';
import "./TaskItem.css";

interface TaskItemProps {
    task: Task,
    index: number,
    handleViewTaskClick: (task: Task) => void;
    history?: boolean
}



export const TaskItem: React.FC<TaskItemProps> = ({task, index, handleViewTaskClick, history}) => {
    


    return (<div className='to-do-element'>
        {!history && <CompleteTask task={task} />}
        <button
            key={index}
            className="view-task"
            onClick={() => {handleViewTaskClick(task)}}
        >
            {task.name}
        </button>
    </div>)
}