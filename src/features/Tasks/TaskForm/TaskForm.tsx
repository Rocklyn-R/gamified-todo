import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import Card from '../../../components/Card/Card';
import './TaskForm.css';
import { setTasks, editTask } from '../../../store/TasksSlice';
import { Task } from '../../../types/Types';
import { v4 as uuidv4 } from "uuid";


interface TaskFormProps {
    handleCloseForm: () => void;
    isEditMode?: boolean,
    selectedTask?: Task,
    handleHideTask?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ handleCloseForm, isEditMode, selectedTask, handleHideTask }) => {

    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState("");
    const [notes, setNotes] = useState('');
    const [coinReward, setCoinReward] = useState(0);
    const [submitError, setSubmitError] = useState(false);


    useEffect(() => {
        if (isEditMode && selectedTask) {
            setTaskName(selectedTask.name);
            setNotes(selectedTask.notes);
            setCoinReward(selectedTask.coinReward);
        }
    }, [isEditMode, selectedTask]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedTask && !taskName) {
            setSubmitError(true)
            return;
        }
        if (!isEditMode) {
            dispatch(setTasks({
                name: taskName,
                notes: notes,
                coinReward: coinReward,
                id: uuidv4(),
            }))
        }
        if (isEditMode && selectedTask && handleHideTask) {
            dispatch(editTask({
                name: taskName,
                notes: notes,
                coinReward: coinReward,
                id: selectedTask.id
            }))
            handleHideTask();
        }

        handleCloseForm();


        setSubmitError(false);
    }




    return (
        <Card className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="add-task-form">
                    <button
                        type="button"
                        className='close'
                        onClick={handleCloseForm}
                    >
                        X
                    </button>
                    <div className='basic-box'>
                        <p>Basic</p>
                        {submitError &&
                            <p>Please name your task</p>
                        }
                        <input
                            placeholder="Task Name"
                            id="task-name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                        <input
                            placeholder='Notes (optional)'
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <div className='reward-box'>
                        <p>Coin Reward</p>
                        <input
                            placeholder='Coin Reward'
                            id="coin-reward"
                            type="number"
                            value={coinReward}
                            onChange={(e) => setCoinReward(parseInt(e.target.value, 10))}
                        />
                    </div>

                    <button type="submit" value="Submit" className="submit-task-button">{selectedTask ? "Done editing" : "Create task"}</button>
                </div>

            </form>
        </Card>

    )
}