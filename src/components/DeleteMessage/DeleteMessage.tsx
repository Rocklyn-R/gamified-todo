import React from "react";
import Card from "../Card/Card";
import "./DeleteMessage.css";
import { Task } from "../../types/Types";
import { useDispatch } from "react-redux";
import { deleteTask, deleteTaskFromHistory } from "../../store/TasksSlice";


interface DeleteMessageProps {
    showDeleteMessage: boolean;
    setShowDeleteMessage: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTask: Task;
    history: boolean;
    handleHideTask: () => void;
}

export const DeleteMessage: React.FC<DeleteMessageProps> = ({showDeleteMessage, setShowDeleteMessage, selectedTask, history, handleHideTask }) => {
    const dispatch = useDispatch();


    const handleCancel = () => {
        setShowDeleteMessage(false)
    }

    const handleDelete = () => {
        if (!history) {
           dispatch(deleteTask(selectedTask)); 
        } else {
            dispatch(deleteTaskFromHistory(selectedTask));
            handleHideTask();
        }
        
        setShowDeleteMessage(false);
    }

    return (
        <Card >
            <h4>Delete</h4>
            <p>Do you really wish to delete this task{history && " from your history"}?</p>
            <button className="cancel" onClick={handleCancel}>Cancel</button>
            <button className="delete" onClick={handleDelete}>Delete</button>
        </Card>
    )
}