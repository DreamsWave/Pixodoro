import { useEffect, useState } from "react";
import "./App.css";
import { useTimer } from "./hooks/useTimer";
import { POMODORO_STATUS } from "./types";
import { playAudio } from "./utils";
import SettingsMenu from "./components/SettingsMenu";
import Controls from "./components/Controls";
import Clock from "./components/Clock";

function App() {
  const [pomodoroTotalSeconds, setPomodoroTotalSeconds] = useState<number>(
    1 * 60
  );
  const [breakTotalSeconds, setBreakTotalSeconds] = useState<number>(0.5 * 60);
  const [currentPomodoroTotalSeconds, setCurrentPomodoroTotalSeconds] =
    useState<number>(1 * 60);
  const [currentBreakTotalSeconds, setCurrentBreakTotalSeconds] =
    useState<number>(0.5 * 60);
  const [audioVolume, setAudioVolume] = useState<number>(0.5);
  const [status, setStatus] = useState<POMODORO_STATUS>("pomodoro");
  const [pixelSize, setPixelSize] = useState<number>(8);
  const [progress, setProgress] = useState<number>(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);

  const { seconds, start, pause, reset, running, stop } = useTimer();

  useEffect(() => {
    if (status === "pomodoro") {
      if (seconds <= currentPomodoroTotalSeconds) {
        setProgress((seconds / currentPomodoroTotalSeconds) * 100);
        setSecondsLeft(currentPomodoroTotalSeconds - seconds);
      } else {
        timerEnd();
      }
    }
    if (status === "break") {
      if (seconds <= currentBreakTotalSeconds) {
        setProgress((seconds / currentBreakTotalSeconds) * 100);
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
      setStatus("break");
      playAudio("pomodoro-end", audioVolume);
      setSecondsLeft(breakTotalSeconds - seconds);
    } else if (status === "break") {
      setStatus("pomodoro");
      playAudio("break-end", audioVolume);
      setSecondsLeft(pomodoroTotalSeconds - seconds);
    }
    setTimerStarted(false);
  }

  function timerStop() {
    stop();
    setProgress(0);
    if (status === "pomodoro") {
      playAudio("pomodoro-end", audioVolume);
    } else if (status === "break") {
      playAudio("break-end", audioVolume);
    }
    setTimerStarted(false);
    setCurrentPomodoroTotalSeconds(pomodoroTotalSeconds);
    setCurrentBreakTotalSeconds(breakTotalSeconds);
  }

  function timerToggle() {
    if (running) {
      pause();
    } else {
      start();
      if (!timerStarted) {
        setTimerStarted(true);
      }
    }
    playAudio("timer-start", audioVolume);
  }

  function changeTotalSeconds(type: "pomodoro" | "break", sec: number) {
    if (type === "pomodoro") {
      setPomodoroTotalSeconds(sec);
    } else {
      setBreakTotalSeconds(sec);
    }
  }

  return (
    <>
      <div>
        <SettingsMenu
          pixelSize={pixelSize}
          pomodoroTotalSeconds={pomodoroTotalSeconds}
          breakTotalSeconds={breakTotalSeconds}
          changeTotalSeconds={changeTotalSeconds}
        />
        <Clock
          pixelSize={pixelSize}
          progress={progress}
          secondsLeft={secondsLeft}
          status={status}
        />
        <Controls
          running={running}
          handleTimerStop={timerStop}
          handleTimerEnd={timerEnd}
          handleTimerToggle={timerToggle}
          pixelSize={pixelSize}
        />
      </div>
    </>
  );
}

export default App;
