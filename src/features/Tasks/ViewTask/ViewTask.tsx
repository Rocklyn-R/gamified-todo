import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/Card/Card";
import { Task } from "../../../types/Types"
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import "./ViewTask.css"
import { TaskForm } from "../TaskForm/TaskForm";
import { DeleteMessage } from "../../../components/DeleteMessage/DeleteMessage";
import { selectTasks } from "../../../store/TasksSlice";
import { undoCompleteTask } from "../../../store/TasksSlice";
import { subtractCoins } from "../../../store/RewardsSlice";

interface ViewTaskProps {
    selectedTask: Task,
    handleHideTask: () => void;
    history: boolean
}

export const ViewTask: React.FC<ViewTaskProps> = ({ selectedTask, handleHideTask, history }) => {
    const [editTask, setEditTask] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [selectedTaskDeleted, setSelectedTaskDeleted] = useState(false);
    const dispatch = useDispatch();

    const allTasks = useSelector(selectTasks);

    const handleEditTask = () => {
        setEditTask(true);
    }


    const handleDeleteTask = () => {
        setShowDeleteMessage(true);
    }

    const hideDeleteMessage = () => {
        setShowDeleteMessage(false)
    }

    const handleUndoComplete = (task: Task) => {
        dispatch(undoCompleteTask(task));
        dispatch(subtractCoins(task.coinReward));
        handleHideTask();
    }

    const overlayRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (history) {
            return;
        }
        if (!allTasks.includes(selectedTask)) {
            setSelectedTaskDeleted(true);
        }
    }, [allTasks, selectedTask])



    const handleCloseForm = () => {
        setEditTask(false);
    }

    return (
        <>
            {!editTask && !selectedTaskDeleted &&
                <Card className="view-task-container">
                    <button
                        className="close"
                        onClick={handleHideTask}
                    >
                        X
                    </button>
                    <div className="edit-delete-buttons">
                        {!history &&
                            <button
                                className="edit-task"
                                onClick={handleEditTask}
                            >
                                <FaRegEdit className="edit-task-icon" /></button>
                        }

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
                    {history && 
                        <button className="undo-complete" onClick={() => handleUndoComplete(selectedTask)}>
                            Undo completion
                        </button>}
                    {showDeleteMessage &&
                        <div className="overlay" ref={overlayRef}>
                            <DeleteMessage
                                hideDeleteMessage={hideDeleteMessage}
                                selectedTask={selectedTask}
                                history={history}
                                handleHideTask={handleHideTask}
                            />
                        </div>

                    }
                </Card>
            }

            {editTask &&
                <TaskForm
                    selectedTask={selectedTask}
                    isEditMode={true}
                    handleHideTask={handleHideTask}
                    handleCloseForm={handleCloseForm}
                />}

        </>

    )
}