import styled from "styled-components";
import PixelCircle from "../../components/PixelCircle";
import {
  useAppDispatch,
  useAppSelector,
  useAudio,
  usePixelSize,
  useTimer,
} from "../../hooks";
import Time from "../../components/Time";
import { useEffect } from "react";
import {
  selectTimer,
  setProgress,
  setCurrentBreakTotalSeconds,
  setCurrentPomodoroTotalSeconds,
  setStatus,
  setStarted,
  setSecondsLeft,
} from "./timerSlice";
import Controls from "../../components/Controls";

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
  const { pixelSize } = usePixelSize();
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
  const { play } = useAudio();

  useEffect(() => {
    if (status === "pomodoro") {
      if (seconds <= currentPomodoroTotalSeconds) {
        dispatch(setProgress((seconds / currentPomodoroTotalSeconds) * 100));
        dispatch(setSecondsLeft(currentPomodoroTotalSeconds - seconds));
      } else {
        timerEnd();
      }
    }
    if (status === "break") {
      if (seconds <= currentBreakTotalSeconds) {
        dispatch(setProgress((seconds / currentBreakTotalSeconds) * 100));
        dispatch(setSecondsLeft(currentBreakTotalSeconds - seconds));
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
      play("pomodoro-end");
      dispatch(setSecondsLeft(breakTotalSeconds - seconds));
    } else if (status === "break") {
      dispatch(setStatus("pomodoro"));
      play("break-end");
      dispatch(setSecondsLeft(pomodoroTotalSeconds - seconds));
    }
    dispatch(setStarted(false));
  }

  function timerStop() {
    stop();
    setProgress(0);
    if (status === "pomodoro") {
      play("pomodoro-end");
    } else if (status === "break") {
      play("break-end");
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
    play("timer-start");
  }

  return (
    <TimerBase pixelSize={pixelSize}>
      <Clock>
        <PixelCircle
          progress={progress}
          color={status === "pomodoro" ? "tomato" : "forestgreen"}
        />
        <Time />
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
