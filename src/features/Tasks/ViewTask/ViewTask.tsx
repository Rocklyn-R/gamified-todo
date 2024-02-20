import React, { useState, useEffect, useRef } from "react";
import { useSelector, UseSelector } from "react-redux";
import Card from "../../../components/Card/Card";
import { Task } from "../../../types/Types"
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import "./ViewTask.css"
import { TaskForm } from "../TaskForm/TaskForm";
import { DeleteMessage } from "../../../components/DeleteMessage/DeleteMessage";
import { selectTasks } from "../../../store/TasksSlice";

interface ViewTaskProps {
    selectedTask: Task,
    setShowTask: React.Dispatch<React.SetStateAction<boolean>>
}

export const ViewTask: React.FC<ViewTaskProps> = ({ selectedTask, setShowTask }) => {
    const [editTask, setEditTask] = useState(false);
    const [ showDeleteMessage, setShowDeleteMessage ] = useState(false);
    const [ selectedTaskDeleted, setSelectedTaskDeleted ] = useState(false);

    const allTasks = useSelector(selectTasks)

    const handleEditTask = () => {
        setEditTask(true);
    }

    const handleCloseViewTask = () => {
        setShowTask(false);
    }

    const handleDeleteTask = () => {
        setShowDeleteMessage(true);
    }

    const overlayRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (!allTasks.includes(selectedTask)) {
            setSelectedTaskDeleted(true);
        }
    }, [allTasks])


    return (
        <>
            {!editTask && !selectedTaskDeleted &&
                <Card className="view-task-container">
                    <button 
                        className="close"
                        onClick={handleCloseViewTask}
                    >
                        X
                    </button>
                    <div className="edit-delete-buttons">
                        <button 
                            className="edit-task"
                            onClick={handleEditTask}
                        >
                            <FaRegEdit className="edit-task-icon" /></button>
                        <button 
                            className="delete-task"
                            onClick={handleDeleteTask}
                        >
                                <MdDeleteOutline className='delete-task-icon' />
                        </button>
                    </div>

                    <p>
                        Name: {selectedTask.name}
                    </p>
                    <p>
                        {selectedTask.notes && `Notes: ${selectedTask.notes}`}
                    </p>
                    <p>
                        Coin Reward: {selectedTask.coinReward}
                    </p>
                    {showDeleteMessage && 
                    <div className="overlay" ref={overlayRef}>
                         <DeleteMessage
                            showDeleteMessage={showDeleteMessage}
                            setShowDeleteMessage={setShowDeleteMessage}
                            selectedTask={selectedTask}
                     />
                    </div>
                    
                    }
                </Card>
            }

            {editTask &&
                <TaskForm
                    selectedTask={selectedTask}
                    isEditMode={true}
                    setEditTask={setEditTask}
                    setShowTask={setShowTask}
                />}

        </>

    )
}