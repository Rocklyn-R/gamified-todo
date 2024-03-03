import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import Card from '../../../components/Card/Card';
import './TaskForm.css';
import { setTasks, editTask } from '../../../store/TasksSlice';
import { Task } from '../../../types/Types';
import { v4 as uuidv4 } from "uuid";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaRegEdit } from "react-icons/fa";




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
    const [deadlineOption, setDeadlineOption] = useState("");
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [coinReward, setCoinReward] = useState(0);
    const [submitError, setSubmitError] = useState(false);
    const [penalty, setPenalty] = useState(0);
   
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {


        if (isEditMode && selectedTask) {
            setTaskName(selectedTask.name);
            setNotes(selectedTask.notes);
            setCoinReward(selectedTask.coinReward);
            setPenalty(selectedTask.coinPenalty);
        }
    }, [isEditMode, selectedTask]);



    const handleSelectDeadlineOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDeadlineOption(event.target.value);
        console.log(event.target.value);
        if (event.target.value === "today") {
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            setDeadline(today);
        } else if (event.target.value === "tomorrow") {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(23, 59, 59, 999);
            setDeadline(tomorrow);
        } else {
            setDeadline(null);
        }
    }

    const handleEditDeadline = () => {
        setDeadline(null);
    }



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const taskDeadline = deadline ? deadline.toISOString() : ""
        if (!isEditMode) {
            dispatch(setTasks({
                name: taskName,
                notes: notes,
                coinReward: coinReward,
                id: uuidv4(),
                deadline: taskDeadline,
                coinPenalty: penalty,
                overdue: false
            }))
        }
        if (isEditMode && selectedTask && handleHideTask) {
            dispatch(editTask({
                name: taskName,
                notes: notes,
                coinReward: coinReward,
                id: selectedTask.id,
                deadline: taskDeadline,
                coinPenalty: penalty,
                overdue: false
            }))
            console.log(deadline)
            handleHideTask();
        }

        handleCloseForm();


        setSubmitError(false);
    }




    return (
        <Card className="form-container overlay-card">
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
                <label>Deadline</label>
                <select
                    id="deadline"
                    value={deadlineOption}
                    onChange={handleSelectDeadlineOption}
                >
                    <option value="nodeadline">No deadline</option>
                    <option value="today">Today</option>
                    <option value="tomorrow">Tomorrow</option>
                    <option value="custom">Custom</option>
                </select>
                {deadlineOption === 'custom' && !deadline && (
                    <div className='overlay' ref={overlayRef}>
                        <Calendar 
                        minDate={new Date()}
                        value={deadline} 
                        onChange={(date) => {
                            if (date instanceof Date) {
                                date.setHours(23, 59, 59, 999);
                                setDeadline(date);
                                console.log(date);
                            }
                        }} />
                    </div>
                )}
                {deadline && deadlineOption === "custom" &&
                <div className='selected-deadline'>
                 <p>{deadline.toLocaleDateString()}</p>
                <button 
                onClick={handleEditDeadline}
                type="button">
                    <FaRegEdit />
                    </button>
                </div>
               
                }
                {(deadlineOption === "today" || deadlineOption === "tomorrow" || deadlineOption === "custom") && (
                    <>
                    <label>Coin Penalty: (optional)</label>
                    <input 
                        id='penalty'
                        type="number"
                        value={penalty}
                        onChange={(e) => setPenalty(parseInt(e.target.value, 10))}
                    />
                    </>
                    
                )}
                <button type="submit" value="Submit" className="command-button">{selectedTask ? "Done editing" : "Create task"}</button>


            </form>
        </Card>

    )
}