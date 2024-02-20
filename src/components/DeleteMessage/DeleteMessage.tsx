import React, { useEffect, useRef } from "react";
import Card from "../Card/Card";
import "./DeleteMessage.css";
import { Task } from "../../types/Types";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../store/TasksSlice";

interface DeleteMessageProps {
    showDeleteMessage: boolean;
    setShowDeleteMessage: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTask: Task;
}

export const DeleteMessage: React.FC<DeleteMessageProps> = ({showDeleteMessage, setShowDeleteMessage, selectedTask }) => {
    const dispatch = useDispatch();


    const handleCancel = () => {
        setShowDeleteMessage(false)
    }

    const handleDelete = () => {
        dispatch(deleteTask(selectedTask));
        setShowDeleteMessage(false);
    }

    return (
        <Card >
            <h4>Delete</h4>
            <p>Do you really wish to delete this task?</p>
            <button className="cancel" onClick={handleCancel}>Cancel</button>
            <button className="delete" onClick={handleDelete}>Delete</button>
        </Card>
    )
}