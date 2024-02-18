import { configureStore, combineReducers } from "@reduxjs/toolkit";
import tasksReducer from "./TasksSlice";

export interface RootState {
    tasks: ReturnType<typeof tasksReducer>;
}

export default configureStore({
    reducer: combineReducers({
        tasks: tasksReducer
    })
})