import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PomodoroState } from "../types/Types";
import { RootState } from "./Store";

export const PomodoroSlice = createSlice({
    name: "pomodoro",
    initialState: {
        secondsLeft: 10,
        isPaused: true,
        mode: "work",
        workMinutes: 25,
        breakMinutes: 5,
        pomodoros: 0
    } as PomodoroState,
    reducers: {
        setWorkMinutes: (state, action: PayloadAction<number>) => {
            state.workMinutes = action.payload;
        },
        setBreakMinutes: (state, action: PayloadAction<number>) => {
            state.breakMinutes = action.payload;
        },
        play: (state) => {
            state.isPaused = false;
        },
        pause: (state) => {
            state.isPaused = true;
        },
        setMode: (state, action) => {

        },
        tick: (state) => {
            if (state.isPaused) {
                return;
            }
            if (state.secondsLeft === 0) {
                state.isPaused = true;
                if (state.mode === 'work') {
                    state.mode = 'break';
                    state.secondsLeft = state.breakMinutes * 60;
                    state.pomodoros = state.pomodoros + 1;
                } else {
                    state.mode = "work";
                    state.secondsLeft = state.workMinutes * 60;
                }
            } else {
                state.secondsLeft = state.secondsLeft - 1;
            }
        }
    }
})

export const {
    setWorkMinutes,
    setBreakMinutes,
    play,
    pause,
    tick
} = PomodoroSlice.actions

export const selectWorkMinutes = (state: RootState) => state.pomodoro.workMinutes;
export const selectBreakMinutes = (state: RootState) => state.pomodoro.breakMinutes;
export const selectIsPaused = (state: RootState) => state.pomodoro.isPaused;
export const selectSecondsLeft = (state: RootState) => state.pomodoro.secondsLeft;
export const selectPomodoros = (state: RootState) => state.pomodoro.pomodoros;
export const selectMode = (state: RootState) => state.pomodoro.mode

export default PomodoroSlice.reducer;