import React, { useState, useRef, useEffect } from 'react';
import Card from '../../../components/Card/Card';
import { selectCompletedTasks } from '../../../store/TasksSlice';
import { useSelector } from 'react-redux';
import { TaskItem } from '../TaskItem/TaskItem';
import "./TaskHistory.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { Task } from '../../../types/Types';
import { ViewTask } from '../ViewTask/ViewTask';

export const TaskHistory = () => {
    const completedTasks = useSelector(selectCompletedTasks);
    const [ viewHistoryTask, setViewHistoryTask ] = useState(false);
    const [ selectedTask, setSelectedTask ] = useState({
        name: "",
        notes: "",
        coinReward: 0,
        id: ""
    })
    const overlayRef = useRef<HTMLDivElement>(null);

    const handleViewHistoryTask = (task: Task) => {
        setViewHistoryTask(true);
        setSelectedTask(task);
    }

    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === overlayRef.current) {
            setViewHistoryTask(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOverlayClick);

        return () => {
            document.removeEventListener('mousedown', handleOverlayClick);
        };
    }, []);

    const handleHideTask = () => {
        setViewHistoryTask(false);
    }

    return (
        <>
        <Link to="../tasks"><IoArrowBackOutline className="back-icon" /></Link>
         <Card className="tasks-container">
            <h1> Task History </h1>
            {completedTasks.map((task, index) => (
                <TaskItem 
                    key={index}
                    task={task}
                    index={index}
                    history={true}
                    handleViewTaskClick={handleViewHistoryTask}
                />
            ))}
            {viewHistoryTask && 
            <div className='overlay' ref={overlayRef}>

                 <ViewTask
                selectedTask={selectedTask}
                handleHideTask={handleHideTask}
                history={true}
            />
            </div>
           }
        </Card>
        </>
       
    )
}