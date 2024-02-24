import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import Card from '../../../components/Card/Card';
import './TaskForm.css';
import { setTasks, editTask } from '../../../store/TasksSlice';
import { Task } from '../../../types/Types';
import { v4 as uuidv4 } from "uuid";
import DatePicker from 'react-datepicker';



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
                    <button
                        type="button"
                        className='close'
                        onClick={handleCloseForm}
                    >
                        X
                    </button>
                    
    
                        {submitError &&
                            <p>Please name your task</p>
                        }
                        <label htmlFor='task-name'>Name:</label>
                        <input
                            placeholder="Task Name"
                            id="task-name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            required
                        /> 
                       
                        <label htmlFor='notes'>Notes:</label>
                        <input
                            placeholder='Notes (optional)'
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                       
                        <label htmlFor='coin-reward'>Coin Reward:</label>
                        <input
                            placeholder='Coin Reward'
                            id="coin-reward"
                            type="number"
                            value={coinReward}
                            onChange={(e) => setCoinReward(parseInt(e.target.value, 10))}
                            required
                        />
                    

                    <button type="submit" value="Submit" className="command-button">{selectedTask ? "Done editing" : "Create task"}</button>
              

            </form>
        </Card>

    )
}