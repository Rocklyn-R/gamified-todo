import React, { useState } from "react";
import { UseSelector } from "react-redux";
import Card from "../../../components/Card";
import { Task } from "../../../types/Types"
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import "./ViewTask.css"
import { TaskForm } from "../TaskForm/TaskForm";

interface ViewTaskProps {
    selectedTask: Task,
    setShowTask: React.Dispatch<React.SetStateAction<boolean>>
}

export const ViewTask: React.FC<ViewTaskProps> = ({ selectedTask, setShowTask }) => {
    const [editTask, setEditTask] = useState(false);


    const handleEditTask = () => {
        setEditTask(true);
    }

    return (
        <>
            {!editTask &&
                <Card>
                    <div className="edit-delete-buttons">
                        <button 
                            className="edit-task"
                            onClick={handleEditTask}
                        >
                            <FaRegEdit className="edit-task-icon" /></button>
                        <button className="delete-task"><MdDeleteOutline className='delete-task-icon' /></button>
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