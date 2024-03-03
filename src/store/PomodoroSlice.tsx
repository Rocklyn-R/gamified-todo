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
        longBreakMinutes: 15,
        numOfSessionsToLongBreak: 4,
        sessionsRemaining: 4,
        pomodoros: 5,
        pomodoroPrice: 10,
    } as PomodoroState,
    reducers: {
        setWorkMinutes: (state, action: PayloadAction<number>) => {
            state.workMinutes = action.payload;
        },
        setBreakMinutes: (state, action: PayloadAction<number>) => {
            state.breakMinutes = action.payload;
        },
        setLongBreakMinutes: (state, action: PayloadAction<number>) => {
            state.longBreakMinutes = action.payload;
        },
        setNumOfSessionsToLongBreak: (state, action: PayloadAction<number>) => {
            const completedSessions = state.numOfSessionsToLongBreak - state.sessionsRemaining;
            state.numOfSessionsToLongBreak = action.payload;
            state.sessionsRemaining = action.payload - completedSessions;
        },
        play: (state) => {
            state.isPaused = false;
        },
        pause: (state) => {
            state.isPaused = true;
        },
        tick: (state) => {
            if (state.isPaused) {
                return;
            }
            if (state.secondsLeft === 0) {
                state.isPaused = true;
                if (state.mode === 'work' && state.sessionsRemaining > 1) {
                    state.mode = 'break';
                    state.secondsLeft = state.breakMinutes * 60;
                    state.pomodoros = state.pomodoros + 1;
                    state.sessionsRemaining = state.sessionsRemaining - 1;
                } else if (state.mode === "work" && state.sessionsRemaining === 1) {
                    state.mode ="longBreak";
                    state.secondsLeft = state.longBreakMinutes * 60;
                    state.sessionsRemaining = 0;
                    state.pomodoros = state.pomodoros + 1;
                } else if (state.mode === "longBreak") {
                    state.mode = "work";
                    state.secondsLeft = state.workMinutes * 60;
                    state.sessionsRemaining = state.numOfSessionsToLongBreak;
                } else {
                    state.mode = "work";
                    state.secondsLeft = state.workMinutes * 60;
                }
            } else {
                state.secondsLeft = state.secondsLeft - 1;
            }
        },
        reset: (state) => {
            state.isPaused = true;
            if (state.mode === "work") {
                state.secondsLeft = state.workMinutes * 60;
            } else {
                state.secondsLeft = state.breakMinutes * 60;
            }
        },
        skip: (state) => {
            state.isPaused = true;
            if (state.mode === "work" && state.sessionsRemaining > 1) {
                state.mode = "break";
                state.secondsLeft = state.breakMinutes * 60;
                state.sessionsRemaining = state.sessionsRemaining - 1;
            } else if (state.mode === "work" && state.sessionsRemaining === 1) {
                state.mode = "longBreak";
                state.secondsLeft = state.longBreakMinutes * 60;
                state.sessionsRemaining = 0;
            } else if (state.mode === "longBreak") {
                state.mode = "work";
                state.secondsLeft = state.workMinutes * 60;
                state.sessionsRemaining = state.numOfSessionsToLongBreak;
            } else {
                state.mode = "work";
                state.secondsLeft = state.workMinutes * 60;
            }
        },
        setSellingPrice: (state, action: PayloadAction<number>) => {
            state.pomodoroPrice = action.payload;
        },
        sellPomodoros: (state, action: PayloadAction<number>) => {
            state.pomodoros = state.pomodoros - action.payload;
        }
    }
})

export const {
    setWorkMinutes,
    setBreakMinutes,
    setLongBreakMinutes,
    setNumOfSessionsToLongBreak,
    play,
    pause,
    tick,
    reset,
    skip,
    setSellingPrice,
    sellPomodoros
} = PomodoroSlice.actions

export const selectWorkMinutes = (state: RootState) => state.pomodoro.workMinutes;
export const selectBreakMinutes = (state: RootState) => state.pomodoro.breakMinutes;
export const selectLongBreakMinutes = (state: RootState) => state.pomodoro.longBreakMinutes;
export const selectNumOfSessionsToLongBreak = (state: RootState) => state.pomodoro.numOfSessionsToLongBreak;
export const selectSessionsRemaining = (state: RootState) => state.pomodoro.sessionsRemaining;
export const selectIsPaused = (state: RootState) => state.pomodoro.isPaused;
export const selectSecondsLeft = (state: RootState) => state.pomodoro.secondsLeft;
export const selectPomodoros = (state: RootState) => state.pomodoro.pomodoros;
export const selectMode = (state: RootState) => state.pomodoro.mode
export const selectPomodoroPrice = (state: RootState) => state.pomodoro.pomodoroPrice;

export default PomodoroSlice.reducer;