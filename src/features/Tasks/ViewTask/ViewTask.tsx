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

interface ViewTaskProps {
    selectedTask: Task,
    setShowTask: React.Dispatch<React.SetStateAction<boolean>>,
    history: boolean
}

export const ViewTask: React.FC<ViewTaskProps> = ({ selectedTask, setShowTask, history }) => {
    const [editTask, setEditTask] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [selectedTaskDeleted, setSelectedTaskDeleted] = useState(false);
    const dispatch = useDispatch();

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

    const handleUndoComplete = (task: Task) => {
        dispatch(undoCompleteTask(task))
        handleCloseViewTask();
    }

    const overlayRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (history) {
            console.log("This is happening")
            return;
        }
        if (!allTasks.includes(selectedTask)) {
            setSelectedTaskDeleted(true);
        }
    }, [allTasks, selectedTask])


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
                                showDeleteMessage={showDeleteMessage}
                                setShowDeleteMessage={setShowDeleteMessage}
                                selectedTask={selectedTask}
                                history={history}
                                setShowTask={setShowTask}
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