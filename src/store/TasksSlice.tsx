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
            id: '1213'
        }] as Task[],
        completedTasks: [] as Task[]
    } as TasksState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },

        editTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },

        completeTask: (state, action: PayloadAction<Task>) => {
            const completedTask = state.tasks.find(task => task.id === action.payload.id)
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
            
            if (completedTask) {
                state.completedTasks.push(completedTask);
            }
        }
    }
})

export const {
    setTasks,
    editTask
} = TasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export default TasksSlice.reducer;