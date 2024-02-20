import React from 'react';
import Card from '../../../components/Card/Card';
import { selectCompletedTasks } from '../../../store/TasksSlice';
import { useSelector } from 'react-redux';
import { TaskItem } from '../TaskItem/TaskItem';
import "./TaskHistory.css";

export const TaskHistory = () => {
    const completedTasks = useSelector(selectCompletedTasks);

    return (
        <Card className="tasks-container">
            <h1> Task History </h1>
            {completedTasks.map((task, index) => (
                <TaskItem 
                    key={index}
                    task={task}
                    index={index}
                    history={true}
                />
            ))}
        </Card>
    )
}