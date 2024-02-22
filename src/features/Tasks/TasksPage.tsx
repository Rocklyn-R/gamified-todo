import React, { useState, useRef, useEffect } from 'react';
import Card from '../../components/Card/Card';
import './TasksPage.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import { TaskForm } from './TaskForm/TaskForm';
import { useSelector } from 'react-redux';
import { selectTasks, selectCompletedTasks } from '../../store/TasksSlice';
import { ViewTask } from './ViewTask/ViewTask';
import { Task } from "../../types/Types";
import { TaskItem } from "./TaskItem/TaskItem";
import { GrHistory } from "react-icons/gr";
import { Link } from "react-router-dom";


export const Tasks = () => {

    const tasks = useSelector(selectTasks);
    const [showForm, setShowForm] = useState(false);
    const [showTask, setShowTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState({
        name: "",
        notes: "",
        coinReward: 0,
        id: ""
    });
    const [selectedTaskDeleted, setSelectedTaskDeleted] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    const completedTasks = useSelector(selectCompletedTasks)

    const handleAddTaskClick = () => {
        setShowForm(!showForm);
    }

    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === overlayRef.current) {
            setShowForm(false);
            setShowTask(false);
        }
    };


    useEffect(() => {
        document.addEventListener('mousedown', handleOverlayClick);

        return () => {
            document.removeEventListener('mousedown', handleOverlayClick);
        };
    }, []);


    useEffect(() => {
        // Check if the selected task is deleted from the tasks array
        if (selectedTask.id && !tasks.find(task => task.id === selectedTask.id)) {
            setSelectedTaskDeleted(true);
        } else {
            setSelectedTaskDeleted(false);
        }
    }, [tasks, selectedTask]);

    const handleViewTaskClick = (task: Task) => {
        setShowTask(true);
        setSelectedTask(task);
    }

    const handleHideTask = () => {
        setShowTask(false);
    }

    const handleCloseForm = () => {
        setShowForm(false);
    }


    return (
        <>  
        {completedTasks.length > 0 &&
            <div className='task-history-icon'>
                <Link to="/tasks/history" ><GrHistory className='history-icon' /></Link>
            </div>
        }


            <Card className="tasks-container">
                <div className="date-box">
                    <h1>{formattedDate}</h1>
                </div>
                <div className='to-do-list'>
                    {tasks.length === 0 && <p>Add new tasks!</p>}
                    {tasks.map((task, index) => {
                        return <TaskItem task={task} index={index} handleViewTaskClick={handleViewTaskClick} />
                    })}
                </div>

                {showTask && !selectedTaskDeleted && (
                    <div className='overlay' ref={overlayRef}>
                        <ViewTask
                            selectedTask={selectedTask}
                            handleHideTask={handleHideTask}
                            history={false}
                        />
                    </div>
                )}

                {showForm && (
                    <div className="overlay" ref={overlayRef}>
                        <TaskForm
                            handleCloseForm={handleCloseForm}
                            isEditMode={false}
                        />
                    </div>
                )
                }
            </Card>
            <div className="add-task">
                <button onClick={handleAddTaskClick}><IoIosAddCircleOutline /></button>
            </div>
        </>
    )
}