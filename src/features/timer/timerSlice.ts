import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type PomodoroStatus = "pomodoro" | "break";
interface TimerState {
  pomodoroTotalSeconds: number;
  breakTotalSeconds: number;
  currentPomodoroTotalSeconds: number;
  currentBreakTotalSeconds: number;
  status: PomodoroStatus;
  progress: number;
  started: boolean;
  secondsLeft: number;
  autoMode: boolean;
}

const initialState: TimerState = {
  pomodoroTotalSeconds: 1500,
  breakTotalSeconds: 300,
  currentPomodoroTotalSeconds: 1500,
  currentBreakTotalSeconds: 300,
  status: "pomodoro",
  progress: 0,
  started: false,
  secondsLeft: 0,
  autoMode: true,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setPomodoroTotalSeconds: (state, action: PayloadAction<number>) => {
      state.pomodoroTotalSeconds = action.payload;
    },
    setBreakTotalSeconds: (state, action: PayloadAction<number>) => {
      state.breakTotalSeconds = action.payload;
    },
    setCurrentPomodoroTotalSeconds: (state, action: PayloadAction<number>) => {
      state.currentPomodoroTotalSeconds = action.payload;
    },
    setCurrentBreakTotalSeconds: (state, action: PayloadAction<number>) => {
      state.currentBreakTotalSeconds = action.payload;
    },
    setStatus: (state, action: PayloadAction<PomodoroStatus>) => {
      state.status = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setStarted: (state, action: PayloadAction<boolean>) => {
      state.started = action.payload;
    },
    setSecondsLeft: (state, action: PayloadAction<number>) => {
      state.secondsLeft = action.payload;
    },
    setAutoMode: (state, action: PayloadAction<boolean>) => {
      state.autoMode = action.payload;
    },
  },
});

export const {
  setPomodoroTotalSeconds,
  setBreakTotalSeconds,
  setCurrentPomodoroTotalSeconds,
  setCurrentBreakTotalSeconds,
  setStatus,
  setProgress,
  setStarted,
  setSecondsLeft,
  setAutoMode,
} = timerSlice.actions;

export const selectTimer = (state: RootState) => state.timer;

export default timerSlice.reducer;
