import styled, { useTheme } from "styled-components";
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
import PixelCircle from "../../components/PixelCircle";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Time from "../../components/Time";
import { useAudio } from "../audio/useAudio";
import { useTimer } from "./useTimer";
import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import useNotification from "../notification/useNotification";

const Clock = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimerBase = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${({ theme: { pixelSize } }) => pixelSize * 5}px;
`;

type TimerProps = {};
function Timer({}: TimerProps) {
  const {
    pomodoroTotalSeconds,
    breakTotalSeconds,
    currentPomodoroTotalSeconds,
    currentBreakTotalSeconds,
    status,
    progress,
    started,
    autoMode,
    secondsLeft,
  } = useAppSelector(selectTimer);
  const dispatch = useAppDispatch();
  const { seconds, start, pause, running, stop } = useTimer();
  const { play } = useAudio();
  const theme = useTheme();
  const { sendNotification } = useNotification();

  useEffect(() => {
    if (status === "pomodoro") {
      if (seconds <= currentPomodoroTotalSeconds) {
        timerUpdate();
      } else {
        if (autoMode) {
          timerSwitch();
          timerStart();
          sendNotification("Focus finished, starting Break");
        } else {
          timerEnd();
          sendNotification("Focus finished");
        }
      }
    }
    if (status === "break") {
      if (seconds <= currentBreakTotalSeconds) {
        timerUpdate();
      } else {
        if (autoMode) {
          timerSwitch();
          timerStart();
          sendNotification("Break finished, starting Focus");
        } else {
          timerEnd();
          sendNotification("Break finished");
        }
      }
    }
  }, [seconds]);

  useEffect(() => {
    invoke("update_tray_icon", { status, progress, secondsLeft });
  }, [status, progress, secondsLeft]);

  useEffect(() => {
    invoke("update_tray_menu_item_status", { status, progress, secondsLeft });
  }, [status, secondsLeft]);

  useEffect(() => {
    const unlistenStart = listen("start", () => {
      timerStart();
    });
    const unlistenPause = listen("pause", () => {
      timerPause();
    });
    const unlistenStop = listen("stop", () => {
      timerStop();
    });
    const unlistenSkip = listen("skip", () => {
      timerSwitch();
    });
    return () => {
      unlistenStart.then((f) => f());
      unlistenPause.then((f) => f());
      unlistenStop.then((f) => f());
      unlistenSkip.then((f) => f());
    };
  }, [status]);

  function timerUpdate() {
    if (status === "pomodoro") {
      dispatch(setProgress((seconds / currentPomodoroTotalSeconds) * 100));
      dispatch(setSecondsLeft(currentPomodoroTotalSeconds - seconds));
    } else {
      dispatch(setProgress((seconds / currentBreakTotalSeconds) * 100));
      dispatch(setSecondsLeft(currentBreakTotalSeconds - seconds));
    }
  }

  function timerEnd(
    {
      playSound = true,
      notification,
    }: { playSound?: boolean; notification?: string } = { playSound: true }
  ) {
    timerPause({ playSound: false });

    if (notification) {
      sendNotification(notification);
    }

    if (playSound) {
      if (status === "pomodoro") {
        play("pomodoro-end");
      } else {
        play("break-end");
      }
    }
  }

  function timerStop(
    {
      playSound = true,
      notification,
    }: { playSound?: boolean; notification?: string } = {
      playSound: true,
    }
  ) {
    stop();
    timerReset();
    dispatch(setStarted(false));

    if (notification) {
      sendNotification(notification);
    }

    if (playSound) {
      if (status === "pomodoro") {
        play("pomodoro-end");
      } else if (status === "break") {
        play("break-end");
      }
    }
  }

  function timerToggle() {
    if (running) {
      timerPause();
    } else {
      timerStart();
    }
  }

  function timerStart(
    {
      playSound = true,
      notification,
    }: { playSound?: boolean; notification?: string } = {
      playSound: true,
    }
  ) {
    start();
    if (!started) {
      dispatch(setStarted(true));
    }
    if (notification) {
      sendNotification(notification);
    }
    if (playSound) {
      play("timer-start");
    }
  }

  function timerPause(
    { playSound = true }: { playSound?: boolean } = { playSound: true }
  ) {
    pause();
    if (playSound) {
      play("timer-start");
    }
  }

  function timerSwitch() {
    if (status === "pomodoro") {
      dispatch(setStatus("break"));
    } else if (status === "break") {
      dispatch(setStatus("pomodoro"));
    }

    timerStop({ playSound: false });

    if (status === "pomodoro") {
      dispatch(setSecondsLeft(breakTotalSeconds - seconds));
    } else if (status === "break") {
      dispatch(setSecondsLeft(pomodoroTotalSeconds - seconds));
    }
  }

  function timerReset() {
    dispatch(setProgress(0));
    dispatch(setCurrentPomodoroTotalSeconds(pomodoroTotalSeconds));
    dispatch(setCurrentBreakTotalSeconds(breakTotalSeconds));
  }

  return (
    <TimerBase>
      <Clock>
        <PixelCircle
          progress={progress}
          color={
            status === "pomodoro"
              ? theme.colors.primary
              : theme.colors.secondary
          }
        />
        <Time />
      </Clock>
      <Controls
        running={running}
        handleTimerStop={timerStop}
        handleTimerEnd={timerEnd}
        handleTimerToggle={timerToggle}
        handleTimerSwitch={timerSwitch}
      />
    </TimerBase>
  );
}

export default Timer;
