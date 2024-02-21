import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { Task, TasksState } from "../types/Types"



export const TasksSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [
            {
            name: "Wash the dishes",
            notes: "This one might be tough",
            coinReward: 50,
            id: '1234'
        },
        {
            name: "Wash a load of laundry",
            notes: "Hard One",
            coinReward: 100,
            id: '12134'
        },
        {
            name: "Wash the dishes",
            notes: "This one might be tough",
            coinReward: 50,
            id: '1234'
        },
        {
            name: "Wash a load of laundry",
            notes: "Hard One",
            coinReward: 100,
            id: '12133'
        },
        {
            name: "Wash the dishes",
            notes: "This one might be tough",
            coinReward: 50,
            id: '123433'
        },
        {
            name: "Wash a load of laundry",
            notes: "Hard One",
            coinReward: 100,
            id: '1213242'
        },
        {
            name: "Wash the dishes",
            notes: "This one might be tough",
            coinReward: 50,
            id: '12341414'
        },
        {
            name: "Wash a load of laundry",
            notes: "Hard One",
            coinReward: 100,
            id: '121314123'
        }] as Task[],
        completedTasks: []
    } as TasksState,

    reducers: {
        setTasks: (state, action: PayloadAction<Task>) => {
            state.tasks.unshift(action.payload);
        },

        editTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },

        deleteTask: (state, action: PayloadAction<Task>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
        },

        completeTask: (state, action: PayloadAction<Task>) => {
            const completedTask = state.tasks.find(task => task.id === action.payload.id)
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
            
            if (completedTask) {
                state.completedTasks.unshift(completedTask);
            }
        },

        undoCompleteTask: (state, action: PayloadAction<Task>) => {
            const taskToUndo = state.completedTasks.find(task => task.id === action.payload.id);
            state.completedTasks = state.completedTasks.filter(task => task.id !== action.payload.id);

            if (taskToUndo) {
                state.tasks.unshift(taskToUndo);
            }
            
        },

        deleteTaskFromHistory: (state, action: PayloadAction<Task>) => {
            state.completedTasks = state.completedTasks.filter(task => task.id !== action.payload.id);
        }
    }
})

export const {
    setTasks,
    editTask,
    deleteTask,
    completeTask,
    undoCompleteTask,
    deleteTaskFromHistory
} = TasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectCompletedTasks = (state: RootState) => state.tasks.completedTasks;
export default TasksSlice.reducer;