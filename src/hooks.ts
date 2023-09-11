import { useCallback, useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import {
  selectAppSettings,
  setPixelSize,
} from "./features/appSettings/appSettingsSlice";
import timerStartAudio from "./assets/audio/timer-start.wav";
import pomodoroEndAudio from "./assets/audio/pomodoro-end.wav";
import breakEndAudio from "./assets/audio/break-end.wav";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const interval =
  (delay = 0) =>
  (callback: any) =>
    useEffect(() => {
      const id = setInterval(callback, delay);

      return () => clearInterval(id);
    }, [callback]);

const useSecondsInterval = interval(1000);

export const useTimer = ({
  initialSeconds = 0,
  initiallyRunning = false,
} = {}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(initiallyRunning);

  const tick = useCallback(
    () => (running ? setSeconds((seconds) => seconds + 1) : undefined),
    [running]
  );

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => setSeconds(0);
  const stop = () => {
    pause();
    reset();
  };

  useSecondsInterval(tick);

  return { pause, reset, running, seconds, start, stop };
};

export const useAudio = () => {
  const { audioVolume } = useAppSelector(selectAppSettings);

  function play(audioType: "pomodoro-end" | "break-end" | "timer-start") {
    const audio = new Audio();
    audio.volume = audioVolume;
    switch (audioType) {
      case "timer-start":
        audio.src = timerStartAudio;
        break;
      case "pomodoro-end":
        audio.src = pomodoroEndAudio;
        break;
      case "break-end":
        audio.src = breakEndAudio;
        break;
      default:
        console.log("No audio found");
        return;
    }
    audio.play();
  }

  return { play };
};

export const usePixelSize = () => {
  const { pixelSize } = useAppSelector(selectAppSettings);
  const dispatch = useAppDispatch();

  function setPixel(newPixelSize: number) {
    dispatch(setPixelSize(newPixelSize));
  }

  return { pixelSize, setPixel };
};
