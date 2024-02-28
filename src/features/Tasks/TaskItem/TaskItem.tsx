import React, { useEffect } from 'react';
import { Task } from '../../../types/Types';
import { CompleteTask } from '../CompleteTask/CompleteTask';
import "./TaskItem.css";
import { formatDeadline } from '../../../utilities/utilities';
import { FaCoins } from 'react-icons/fa';
import { subtractCoins } from '../../../store/RewardsSlice';
import { useDispatch } from 'react-redux';

interface TaskItemProps {
    task: Task,
    index: number,
    handleViewTaskClick?: (task: Task) => void;
    history?: boolean
}



export const TaskItem: React.FC<TaskItemProps> = ({ task, index, handleViewTaskClick, history }) => {
    const dispatch = useDispatch()



    return (

        <div className='to-do-element'>
            {!history && <CompleteTask task={task} />}
            <button
                key={index}
                className={"view-task"}
                onClick={() => { if(handleViewTaskClick) {
                     handleViewTaskClick(task)
                } }}
            >
                <div>
                    <p id="task-name-text">{task.name}</p>
                </div>

                <div className='deadline-details'>

                    <p>
                        {task.deadline && `Due: ` + formatDeadline(task.deadline)}
                    </p>

                </div>
                {(task.deadline && task.overdue && !history) && (
                    <div className='status-box'>
                        <p id="overdue-text">OVERDUE</p>
                        {task.coinPenalty > 0 && (
                            <div className='coin-penalty-box'>
                                <p>-<FaCoins className='coins-icon' />{task.coinPenalty}</p>
                            </div>

                        )}

                    </div>
                )}
                 {(task.deadline && task.overdue && history) && (
                    <div className='status-box'>
                        <p id="overdue-text">NOT COMPLETED</p>
                        {task.coinPenalty > 0 && (
                            <div className='coin-penalty-box'>
                                <p>-<FaCoins className='coins-icon' />{task.coinPenalty}</p>
                            </div>

                        )}

                    </div>
                )}
                {(history && !task.overdue) && (
                    <div className='status-box'>
                        <p id="completed-text">COMPLETED</p>
                        {task.coinReward > 0 && (
                            <div className='coin-penalty-box'>
                                <p>+<FaCoins className='coins-icon' />{task.coinReward}</p>
                            </div>

                        )}
                    </div>
                )}

            </button>
        </div>)
}