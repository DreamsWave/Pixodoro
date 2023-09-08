import styled from "styled-components";
import PixelCircle from "../../components/PixelCircle";
import { POMODORO_STATUS } from "../../types";
import { selectPixelSize } from "../pixelSize/pixelSizeSlice";
import { useAppDispatch, useAppSelector, useTimer } from "../../hooks";
import Time from "../../components/Time";
import { useEffect, useState } from "react";
import {
  selectTimer,
  setProgress,
  setBreakTotalSeconds,
  setCurrentBreakTotalSeconds,
  setCurrentPomodoroTotalSeconds,
  setPomodoroTotalSeconds,
  setStatus,
  setStarted,
} from "./timerSlice";
import { playAudio } from "../../utils";
import Controls from "../../components/Controls";

const audioVolume = 0.5;

const Clock = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimerBase = styled.div<{ pixelSize: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ pixelSize }) => pixelSize * 2}px;
`;

type TimerProps = {};
function Timer({}: TimerProps) {
  const pixelSize = useAppSelector(selectPixelSize);
  const {
    pomodoroTotalSeconds,
    breakTotalSeconds,
    currentPomodoroTotalSeconds,
    currentBreakTotalSeconds,
    status,
    progress,
    started,
  } = useAppSelector(selectTimer);
  const dispatch = useAppDispatch();
  const { seconds, start, pause, reset, running, stop } = useTimer();
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  useEffect(() => {
    if (status === "pomodoro") {
      if (seconds <= currentPomodoroTotalSeconds) {
        dispatch(setProgress((seconds / currentPomodoroTotalSeconds) * 100));
        setSecondsLeft(currentPomodoroTotalSeconds - seconds);
      } else {
        timerEnd();
      }
    }
    if (status === "break") {
      if (seconds <= currentBreakTotalSeconds) {
        dispatch(setProgress((seconds / currentBreakTotalSeconds) * 100));
        setSecondsLeft(currentBreakTotalSeconds - seconds);
      } else {
        timerEnd();
      }
    }
  }, [seconds]);

  function timerEnd() {
    stop();
    setProgress(0);
    if (status === "pomodoro") {
      dispatch(setStatus("break"));
      playAudio("pomodoro-end", audioVolume);
      setSecondsLeft(breakTotalSeconds - seconds);
    } else if (status === "break") {
      dispatch(setStatus("pomodoro"));
      playAudio("break-end", audioVolume);
      setSecondsLeft(pomodoroTotalSeconds - seconds);
    }
    dispatch(setStarted(false));
  }

  function timerStop() {
    stop();
    setProgress(0);
    if (status === "pomodoro") {
      playAudio("pomodoro-end", audioVolume);
    } else if (status === "break") {
      playAudio("break-end", audioVolume);
    }
    dispatch(setStarted(false));
    dispatch(setCurrentPomodoroTotalSeconds(pomodoroTotalSeconds));
    dispatch(setCurrentBreakTotalSeconds(breakTotalSeconds));
  }

  function timerToggle() {
    if (running) {
      pause();
    } else {
      start();
      if (!started) {
        dispatch(setStarted(true));
      }
    }
    playAudio("timer-start", audioVolume);
  }

  return (
    <TimerBase pixelSize={pixelSize}>
      <Clock>
        <PixelCircle
          progress={progress}
          color={status === "pomodoro" ? "tomato" : "forestgreen"}
        />
        <Time seconds={secondsLeft} status={status} />
      </Clock>
      <Controls
        running={running}
        handleTimerStop={timerStop}
        handleTimerEnd={timerEnd}
        handleTimerToggle={timerToggle}
      />
    </TimerBase>
  );
}

export default Timer;
