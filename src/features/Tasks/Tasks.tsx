import React, { useState, useRef, useEffect } from 'react';
import Card from '../../components/Card';
import './Tasks.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import { TaskForm } from './TaskForm/TaskForm';
import { useSelector } from 'react-redux';
import { selectTasks } from '../../store/TasksSlice';
import { FaRegEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { ViewTask } from './ViewTask/ViewTask';
import { Task } from "../../types/Types";


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
    const overlayRef = useRef<HTMLDivElement>(null);

    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    const handleAddTaskClick = () => {
        setShowForm(!showForm);
    }

    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === overlayRef.current) {
            setShowForm(false);
            setShowTask(false) // Close form when clicking on the overlay
        }
    };


    useEffect(() => {
        document.addEventListener('mousedown', handleOverlayClick);

        return () => {
            document.removeEventListener('mousedown', handleOverlayClick);
        };
    }, []);

    const handleViewTaskClick = (task: Task) => {
        setShowTask(true);
        setSelectedTask(task);
    }


    return (
        <>

            <Card className="tasks-container">
                <div className="date-box">
                    <h1>{formattedDate}</h1>
                </div>
                <div className='to-do-list'>
                    {tasks.map((task, index) => {
                        return (<div className='to-do-element'>
                            <button
                                key={index}
                                className="view-task"
                                onClick={() => handleViewTaskClick(task)}
                            >
                                {task.name}
                            </button>
                    
                        </div>)
                    })}
                </div>

                {showTask && (
                    <div className='overlay' ref={overlayRef}>
                        <ViewTask
                            selectedTask={selectedTask}
                            setShowTask={setShowTask}
                        />
                    </div>
                )}

                {showForm && (
                    <div className="overlay" ref={overlayRef}>
                        <TaskForm
                            showForm={showForm as boolean}
                            setShowForm={setShowForm}
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