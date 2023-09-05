import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import PixelCircle from "./components/PixelCircle";
import { useTimer } from "./hooks/useTimer";
import { POMODORO_STATUS } from "./types";
import timerStartAudio from "./assets/audio/timer-start.wav";
import pomodoroEndAudio from "./assets/audio/pomodoro-end.wav";
import breakEndAudio from "./assets/audio/break-end.wav";

function App() {
  const POMODORO_TOTAL_SECONDS = 1 * 60; // 25 minutes
  const BREAK_TOTAL_SECONDS = 0.5 * 60;
  const AUDIO_VOLUME = 0.5;

  const [status, setStatus] = useState<POMODORO_STATUS>("pomodoro");
  const [pixelSize, setPixelSize] = useState<number>(8);
  const [progress, setProgress] = useState<number>(0);
  const { seconds, start, pause, reset, running, stop } = useTimer();

  useEffect(() => {
    if (status === "pomodoro") {
      if (seconds <= POMODORO_TOTAL_SECONDS) {
        setProgress((seconds / POMODORO_TOTAL_SECONDS) * 100);
      } else {
        stop();
        setProgress(0);
        setStatus("break");
        const snd = new Audio(pomodoroEndAudio);
        snd.volume = AUDIO_VOLUME;
        snd.play();
      }
    }
    if (status === "break") {
      if (seconds <= BREAK_TOTAL_SECONDS) {
        setProgress((seconds / BREAK_TOTAL_SECONDS) * 100);
      } else {
        stop();
        setProgress(0);
        setStatus("pomodoro");
        const snd = new Audio(breakEndAudio);
        snd.volume = AUDIO_VOLUME;
        snd.play();
      }
    }
  }, [seconds]);

  function timerToggle() {
    if (running) {
      pause();
    } else {
      start();
    }
    const snd = new Audio(timerStartAudio);
    snd.volume = AUDIO_VOLUME;
    snd.play();
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <PixelCircle
          pixelSize={pixelSize}
          progress={progress}
          color={status === "pomodoro" ? "tomato" : "forestgreen"}
        />
        <Button pixelSize={pixelSize} handleClick={timerToggle}>
          {running ? "pause" : "start"}
        </Button>
        <Button pixelSize={pixelSize} handleClick={() => reset()}>
          reset
        </Button>
      </div>
    </>
  );
}

export default App;
