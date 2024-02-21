import { configureStore, combineReducers } from "@reduxjs/toolkit";
import tasksReducer from "./TasksSlice";
import rewardsReducer from "./RewardsSlice";

export interface RootState {
    tasks: ReturnType<typeof tasksReducer>;
    rewards: ReturnType<typeof rewardsReducer>;
}

export default configureStore({
    reducer: combineReducers({
        tasks: tasksReducer,
        rewards: rewardsReducer
    })
})