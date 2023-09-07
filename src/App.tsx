import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import PixelCircle from "./components/PixelCircle";
import { useTimer } from "./hooks/useTimer";
import { POMODORO_STATUS } from "./types";
import { styled } from "styled-components";
import Time from "./components/Time";
import { playAudio } from "./utils";
import PixelIcon from "./components/PixelIcon";
import {
  burgerIconPixelPositions,
  pauseIconPixelPositions,
  playIconPixelPositions,
  stopIconPixelPositions,
} from "./constants";

const Clock = styled.div<{ pixelSize: number }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [pomodoroTotalSeconds, setPomodoroTotalSeconds] = useState<number>(
    1 * 60
  );
  const [breakTotalSeconds, setBreakTotalSeconds] = useState<number>(0.5 * 60);
  const [audioVolume, setAudioVolume] = useState<number>(0.5);
  const [status, setStatus] = useState<POMODORO_STATUS>("pomodoro");
  const [pixelSize, setPixelSize] = useState<number>(8);
  const [progress, setProgress] = useState<number>(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  const { seconds, start, pause, reset, running, stop } = useTimer();

  useEffect(() => {
    if (status === "pomodoro") {
      if (seconds <= pomodoroTotalSeconds) {
        setProgress((seconds / pomodoroTotalSeconds) * 100);
        setSecondsLeft(pomodoroTotalSeconds - seconds);
      } else {
        timerStop();
      }
    }
    if (status === "break") {
      if (seconds <= breakTotalSeconds) {
        setProgress((seconds / breakTotalSeconds) * 100);
        setSecondsLeft(breakTotalSeconds - seconds);
      } else {
        timerStop();
      }
    }
  }, [seconds]);

  function timerStop() {
    stop();
    setProgress(0);
    if (status === "pomodoro") {
      setStatus("break");
      playAudio("pomodoro-end", audioVolume);
    } else if (status === "break") {
      setStatus("pomodoro");
      playAudio("break-end", audioVolume);
    }
  }

  function timerToggle() {
    if (running) {
      pause();
    } else {
      start();
    }
    playAudio("timer-start", audioVolume);
  }

  return (
    <>
      <div>
        <Clock pixelSize={pixelSize}>
          <PixelCircle
            pixelSize={pixelSize}
            progress={progress}
            color={status === "pomodoro" ? "tomato" : "forestgreen"}
          />
          <Time seconds={secondsLeft} />
        </Clock>
        <Button pixelSize={pixelSize} handleClick={timerToggle}>
          {running ? (
            <PixelIcon
              pixelPositions={pauseIconPixelPositions}
              color="lightblue"
              pixelSize={pixelSize}
            />
          ) : (
            <PixelIcon
              pixelPositions={playIconPixelPositions}
              color="lightgreen"
              pixelSize={pixelSize}
            />
          )}
        </Button>
        <Button pixelSize={pixelSize} handleClick={() => stop()}>
          <PixelIcon
            pixelPositions={stopIconPixelPositions}
            color="red"
            pixelSize={pixelSize}
          />
        </Button>
      </div>
    </>
  );
}

export default App;
