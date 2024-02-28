import React, { useState, useRef, useEffect } from 'react';
import Card from '../../components/Card/Card';
import './TasksPage.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import { TaskForm } from './TaskForm/TaskForm';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasks, selectHistoryTasks } from '../../store/TasksSlice';
import { ViewTask } from './ViewTask/ViewTask';
import { Task } from "../../types/Types";
import { TaskItem } from "./TaskItem/TaskItem";
import { GrHistory } from "react-icons/gr";
import { Link } from "react-router-dom";
import { markAsOverDue } from '../../store/TasksSlice';
import { OverdueTasks } from './OverdueTasks/OverdueTasks';
import { selectOverdueTasks } from '../../store/TasksSlice';
import { selectTotalCoins } from '../../store/RewardsSlice';
import { FaCoins } from 'react-icons/fa';



export const Tasks = () => {

    const tasks = useSelector(selectTasks);
    const [showForm, setShowForm] = useState(false);
    const [showTask, setShowTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task>({
        name: "",
        notes: "",
        coinReward: 0,
        id: "",
        deadline: "",
        coinPenalty: 0,
        overdue: false
    });
    const [selectedTaskDeleted, setSelectedTaskDeleted] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);
    const overdueTasksOverlayRef = useRef<HTMLDivElement>(null);

    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    const historyTasks = useSelector(selectHistoryTasks);
    const overdueTasks = useSelector(selectOverdueTasks);
    const totalCoins = useSelector(selectTotalCoins)
    const dispatch = useDispatch();
    const [ showOverdueTasks, setShowOverdueTasks ] = useState(false);
    

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

    useEffect(() => {
        const now = new Date();
        tasks.forEach(task => {
            const deadline = new Date(task.deadline);
            if (deadline < now && !task.overdue) {
                dispatch(markAsOverDue(task));
            }
            setShowOverdueTasks(true);
        })
    })


    return (
        <>
            {historyTasks.length > 0 &&
                <div className='task-history-icon'>
                    <Link to="/tasks/history" ><GrHistory className='history-icon' /></Link>
                </div>
            }
            <Card className="tasks-container">
            <div className="coin-count-header">
                    <h1><FaCoins className='coin-icon' /> {totalCoins}</h1>
                </div>
                <div className="date-box">
                    <h1>{formattedDate}</h1>
                </div>
                <div className='to-do-list'>
                    {tasks.length === 0 && <p>Add new tasks!</p>}
                    {tasks.map((task, index) => {
                        return <TaskItem task={task} index={index} handleViewTaskClick={handleViewTaskClick} />
                    })}
                </div>

                {(overdueTasks.length > 0 && showOverdueTasks) && (
                    <div className='overlay' ref={overdueTasksOverlayRef}>
                        <OverdueTasks />
                    </div>
                )}


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